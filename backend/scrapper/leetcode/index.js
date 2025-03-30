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
      query: `
        query discussPostItems($orderBy: ArticleOrderByEnum, $keywords: [String]!, $tagSlugs: [String!], $skip: Int, $first: Int) {
          ugcArticleDiscussionArticles(
            orderBy: $orderBy
            keywords: $keywords
            tagSlugs: $tagSlugs
            skip: $skip
            first: $first
          ) {
            totalNum
            edges {
              node {
                uuid
                createdAt
                topic {
                    id
                }
              }
            }
          }
        }`,
      variables: {
        "orderBy": "MOST_RECENT",
        "keywords": [
        ],
        "tagSlugs": [
          "compensation"
        ],
        "skip": 0,
        "first": 1000
      },
    };
  }

  if (flag === 'recent') {
    const { post_id: alreadyFetchedTill } = await Post.findOne()
      .select('post_id')
      .sort({ post_id: -1 });
    const response = await axios.post(url, query(), { headers });
    let list = response.data?.data?.ugcArticleDiscussionArticles?.edges
      ?.map((e) => {
        return { post_id: e?.node?.topic.id, createdAt: Math.floor(new Date(e?.node?.createdAt).getTime() / 1000) };
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
    let list = response.data?.data?.ugcArticleDiscussionArticles?.edges
      ?.map((e) => {
        return { post_id: e?.node?.topic.id, createdAt: Math.floor(new Date(e?.node?.createdAt).getTime() / 1000) };
      })
      .filter(

        (e) => e.post_id !== '213414' && !alreadyFetched.includes(e.post_id.toString()),
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
      query: `
        query discussPostDetail($topicId: ID!, $topicIdInt: Int!, $currentPage: Int, $orderBy: String!) {
          ugcArticleDiscussionArticle(topicId: $topicId) {
            uuid
            content
            createdAt
            topic {
              id
              topLevelCommentCount
            }
          }
          topicComments(topicId: $topicIdInt, pageNo: $currentPage, orderBy: $orderBy) {
                data {
                    id
                    post {
                        id
                        content
                    }
                }
            }
        }`,
      variables: {
        "topicId": postId,
        "currentPage": 1,
        "orderBy": "best",
        "topicIdInt": postId
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
        const post = response.data?.data?.ugcArticleDiscussionArticle?.content;
        const createdAt = Math.floor(new Date(response.data?.data?.ugcArticleDiscussionArticle?.createdAt).getTime() / 1000);
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
