<template>
    <div class="submission-history">
      <h2>Submission History</h2>
      <ul>
        <li v-for="submission in submissions" :key="submission.id">
          <p><strong>Submission ID:</strong> {{ submission.id }}</p>
          <p><strong>User ID:</strong> {{ submission.userId }}</p>
          <p><strong>Timestamp:</strong> {{ submission.timestamp }}</p>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      submissions: {
        type: Array,
        required: true
      }
    }
  };
  </script>
  
  <style scoped>
  .submission-history {
    padding: 20px;
  }
  
  .submission-history ul {
    list-style: none;
    padding: 0;
  }
  
  .submission-history li {
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 10px;
    margin-bottom: 10px;
  }
  
  .submission-history li p {
    margin: 5px 0;
  }
  </style>
  