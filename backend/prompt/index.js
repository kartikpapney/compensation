module.exports = {
  parsePostPrompt: () => {
    return `
            You are a helpful assistant tasked with extracting job offer details from posts.

            ## Output Format
            The output should be a JSON array containing one or more JSON object, each representing a job offer. Each JSON object must include the following keys with their respective values. Default values written inside [] which should be produced in case the information about the key is absent.
            - company [""] (string): The name of the company offering the job.
            - prev_ctc [-1] (float): Previous (Current) company total compensation of the candidate.
            - role [""] (string): The job title or role being offered to the candidate.
            - yoe [-1] (float): The years of experience of the candidate.
            - total_ctc [-1] (float): The total compensation offered to the candidate (Include stock, RSUs, joining bonus, relocation bonus etc.).
            - base_offer [-1] (float): The base salary component of the offered to the candidate.
            - location [""] (string): The location of the job. In case remote or wfh(work from home) is mentioned it should be "Remote". Only output the city name in Start Case. Auto-correct should be done for City Name.
            For example, "Bengaluru" instead of "Bangalore, India".
            - international [false] (boolean): If the post mentions a location outside India or contains offer in currency other than INR (Indian Rupees) set this key to true else false
            - review [neutral] (enum ["positive", "negative", "neutral"]): How good is the offer. The decision can be on the basis of ctc, layoffs, work life balance, culture, politics, tech etc.
            For example, If company faces layoffs then it should be negative. For companies with Good Work Life balance should be +ve.

            ## Instructions
            - The output should not contain any json tag.
            - Compensation (prev_ctc, total_ctc, base_offer) format should be always converted to LPA (INR). For example, "3130000 INR" should be represented as 31.3. Avoid scientific notation. Salary in crores like "1.18 cr" should be converted to LPA (1.18 * 100 = 118).
            - For posts with multiple job offers, include JSON object for each offer.

            Your goal is to parse the content of the Post and Comments, and structure the information into the specified "Output Format" and "Instructions" mentioned above.

            ## Post
            {post}

            ## Comment
            {comments}
        `;
  },
  mapRolePrompt: () => {
    return `
            You are a helpful assistant tasked with mapping a given role in software engineering to a more generic role.

            ## Output Format
            The output should be one liner which will be a string present in "generic_roles" array. The decision can be made on following parameters
            - The role offered to candidate
            For example: 
                Input: SDE-1 at Amazon
                Output: Software Engineer I (SDE-1)

            ## Instructions
            - If it's not possible to align a generic role. Then please return NA
            - generic_roles: {generic_roles}

            Your goal is to parse the content of the Information and structure the information into the specified "Output Format" and "Instructions" mentioned above.

            ## Information
            {role}
        `;
  },
};
