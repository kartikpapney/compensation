const axios = require('axios');
const Post = require('../../schema/Post');
const { sleep } = require('../../utils');
const Offer = require('../../schema/Offer');
const { default: mongoose } = require('mongoose');

const url = 'https://leetcode.com/graphql';
const headers = {
  'Content-Type': 'application/json',
};

const setPostId = async function (flag = 'recent') {
  function query() {
    return {
      query: `query fetchCategoryTopics($categories: [String!]!, $first: Int!, $orderBy: TopicSortingOption, $skip: Int, $query: String, $tags: [String!]) {
              categoryTopicList(categories: $categories, orderBy: $orderBy, skip: $skip, query: $query, first: $first, tags: $tags) {
                totalNum
                edges {
                  node {
                    id
                    post {
                        creationDate
                    }
                  }
                }
                __typename
              }
            }`,
      variables: {
        first: 1000,
        skip: 0,
        orderBy: 'newest_to_oldest',
        query: '',
        categories: ['compensation'],
        tags: [],
      },
    };
  }

  if (flag === 'recent') {
    const { post_id: alreadyFetchedTill } = await Post.findOne()
      .select('post_id')
      .sort({ post_id: -1 });
    const response = await axios.post(url, query(), { headers });
    let list = response.data?.data?.categoryTopicList?.edges
      ?.map((e) => {
        return { post_id: e?.node?.id, createdAt: e?.node?.post?.creationDate };
      })
      .filter((e) => parseInt(e.post_id) > parseInt(alreadyFetchedTill));
    await Promise.all(
      list.map(({ post_id, createdAt }) => {
        const post = new Post({
          post_id,
          createdAt,
        });
        return post.save();
      }),
    );
  } else {
    const alreadyFetched = (await Post.find().select('post_id').lean()).map(
      ({ post_id }) => post_id,
    );
    const response = await axios.post(url, query(), { headers });
    let list = response.data?.data?.categoryTopicList?.edges
      ?.map((e) => {
        return { post_id: e?.node?.id, createdAt: e?.node?.post?.creationDate };
      })
      .filter(
        (e) => e.post_id !== '213414' && !alreadyFetched.includes(e.post_id),
      );
    await Promise.all(
      list.map(({ post_id, createdAt }) => {
        const post = new Post({
          post_id,
          createdAt,
        });
        return post.save();
      }),
    );
  }
};

const setPostData = async function () {
  function query(postId) {
    return {
      query: `query FetchTopicAndComments($topicId: Int!, $currentPage: Int!, $orderBy: String!) {
                topic(id: $topicId) {
                    id
                    post {
                        content
                        creationDate
                    }
                }
            
                topicComments(topicId: $topicId, pageNo: $currentPage, orderBy: $orderBy) {
                    data {
                        id
                        post {
                            id
                            content
                        }
                    }
                }
            }
            `,
      variables: {
        topicId: postId,
        currentPage: 1,
        orderBy: 'best',
      },
    };
  }
  try {
    const data = await Post.find({ post: '' })
      .sort({ post_id: -1 })
      .select('post_id');
    console.log(`---- found ${data.length} new posts ----`);
    for (const { post_id } of data) {
      await sleep();
      axios.post(url, query(post_id), { headers }).then(async (response) => {
        const post = response.data?.data?.topic?.post?.content;
        const createdAt = response.data?.data?.topic?.post?.creationDate;
        const comments = response.data?.data?.topicComments?.data
          ?.map((e) => e?.post?.content)
          .filter((e) => e);
        await Post.findOneAndUpdate(
          { post_id: post_id },
          { $set: { post, comments, createdAt } },
        );
      });
    }

    await Post.deleteMany({ post: '' });
  } catch (err) {
    throw err;
  } finally {
  }
};

module.exports = {
  scrap: async function () {
    try {
      console.log('---- started -----');
      await setPostId('all');
      console.log('---- post id fetched -----');
      await setPostData();
      console.log('---- end -----');
    } catch (e) {
      throw e;
    }
  },
};
