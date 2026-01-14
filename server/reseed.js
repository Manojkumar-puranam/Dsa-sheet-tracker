import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Topic from './src/models/Topic.js';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/dsa_sheet';

mongoose.connect(MONGO_URI).then(async () => {
  console.log('Connected to MongoDB');
  
  // Clear existing topics
  await Topic.deleteMany({});
  console.log('✅ Cleared existing topics');
  
  // New comprehensive topics
  const topics = [
    // Algorithms
    {
      name: 'Sorting Algorithms',
      chapter: 'Algorithms',
      problems: [
        { title: 'Bubble Sort', description: 'Basic sorting algorithm', youtubeUrl: 'https://youtu.be/Jdtq5uKz-w4?si=17CUWx9DEQvtUwYC', practiceUrl: 'https://leetcode.com/problems/sort-an-array/', articleUrl: 'https://www.geeksforgeeks.org/bubble-sort/', level: 'Easy' },
          { title: 'Merge Sort', description: 'Divide and conquer sorting', youtubeUrl: 'https://youtu.be/TzeBrDU-JaY?si=9T18lFxVU6N2I2wF', practiceUrl: 'https://leetcode.com/problems/sort-an-array/', articleUrl: 'https://www.geeksforgeeks.org/merge-sort/', level: 'Medium' },
          { title: 'Quick Sort', description: 'Efficient partition-based sorting', youtubeUrl: 'https://youtu.be/7h1s2SojIRw?si=kCEXiNABUch0oeeq', practiceUrl: 'https://leetcode.com/problems/sort-an-array/', articleUrl: 'https://www.geeksforgeeks.org/quick-sort/', level: 'Medium' },
      ],
    },
    {
      name: 'Searching Algorithms',
      chapter: 'Algorithms',
      problems: [
        { title: 'Linear Search', description: 'Basic sequential search', youtubeUrl: 'https://www.youtube.com/watch?v=qH2aWj6qsEE', practiceUrl: 'https://leetcode.com/problems/search-in-a-1d-array/', articleUrl: 'https://www.geeksforgeeks.org/linear-search/', level: 'Easy' },
          { title: 'Binary Search', description: 'Efficient search on sorted array', youtubeUrl: 'https://youtu.be/j5uXyPJ0Pew?si=83SwzET88NVLh6z0', practiceUrl: 'https://leetcode.com/problems/binary-search/', articleUrl: 'https://www.geeksforgeeks.org/binary-search/', level: 'Easy' },
        { title: 'Ternary Search', description: 'Divide array into three parts', youtubeUrl: 'https://www.youtube.com/watch?v=OMzajksIzis', practiceUrl: 'https://codeforces.com/problemset/problem/1475/A', articleUrl: 'https://www.geeksforgeeks.org/ternary-search/', level: 'Medium' },
      ],
    },
    {
      name: 'Dynamic Programming',
      chapter: 'Algorithms',
      problems: [
          { title: 'Fibonacci Sequence', description: 'Classic DP problem', youtubeUrl: 'https://youtu.be/5dRGRueKU3M?si=N0DJokUAkQUC3LNE', practiceUrl: 'https://leetcode.com/problems/fibonacci-number/', articleUrl: 'https://www.geeksforgeeks.org/dynamic-programming/', level: 'Easy' },
          { title: '0/1 Knapsack', description: 'Optimize weight selection', youtubeUrl: 'https://youtu.be/nLmhmB6NzcM?si=p23g4e1Xj7WZ_Fv5', practiceUrl: 'https://leetcode.com/problems/partition-equal-subset-sum/', articleUrl: 'https://www.geeksforgeeks.org/0-1-knapsack-problem/', level: 'Medium' },
        { title: 'Longest Common Subsequence', description: 'Find LCS of two strings', youtubeUrl: 'https://www.youtube.com/watch?v=oxiaZ9grHy8', practiceUrl: 'https://leetcode.com/problems/longest-common-subsequence/', articleUrl: 'https://www.geeksforgeeks.org/longest-common-subsequence/', level: 'Medium' },
      ],
    },
    {
      name: 'Greedy Algorithms',
      chapter: 'Algorithms',
      problems: [
        { title: 'Activity Selection', description: 'Select maximum activities', youtubeUrl: 'https://www.youtube.com/watch?v=guL0Ym2GAKA', practiceUrl: 'https://leetcode.com/problems/video-stitching/', articleUrl: 'https://www.geeksforgeeks.org/greedy-algorithms-set-1-activity-selection-problem/', level: 'Easy' },
        { title: 'Huffman Coding', description: 'Optimal prefix-free codes', youtubeUrl: 'https://www.youtube.com/watch?v=dM6wVK4ZoFk', practiceUrl: 'https://leetcode.com/problems/minimum-time-to-connect-all-points/', articleUrl: 'https://www.geeksforgeeks.org/huffman-coding-greedy-algorithm/', level: 'Tough' },
        { title: 'Fractional Knapsack', description: 'Maximize value with fraction', youtubeUrl: 'https://www.youtube.com/watch?v=TJlYPcKLI7o', practiceUrl: 'https://codeforces.com/problemset/problem/1272/B', articleUrl: 'https://www.geeksforgeeks.org/fractional-knapsack-problem/', level: 'Medium' },
      ],
    },
    {
      name: 'Arrays',
      chapter: 'Data Structures',
      problems: [
          { title: 'Two Sum', description: 'Find pair with target sum', youtubeUrl: 'https://youtu.be/WB2SZ3_QK28?si=LXzOtqVBv6zQJIEC', practiceUrl: 'https://leetcode.com/problems/two-sum/', articleUrl: 'https://www.geeksforgeeks.org/two-sum-problem/', level: 'Easy' },
        { title: 'Maximum Subarray', description: 'Kadane algorithm', youtubeUrl: 'https://www.youtube.com/watch?v=2MmGzdiKR9Y', practiceUrl: 'https://leetcode.com/problems/maximum-subarray/', articleUrl: 'https://www.geeksforgeeks.org/maximum-subarray-problem/', level: 'Medium' },
        { title: '3Sum Problem', description: 'Find triplet with sum', youtubeUrl: 'https://www.youtube.com/watch?v=DhFP8q6DhkU', practiceUrl: 'https://leetcode.com/problems/3sum/', articleUrl: 'https://www.geeksforgeeks.org/find-triplets-array-sum-given-number/', level: 'Medium' },
      ],
    },
    {
      name: 'Linked Lists',
      chapter: 'Data Structures',
      problems: [
          { title: 'Reverse Linked List', description: 'Reverse a linked list', youtubeUrl: 'https://youtu.be/G0_I-ZF0S38?si=Q82jRod8I0c4QBGR', practiceUrl: 'https://leetcode.com/problems/reverse-linked-list/', articleUrl: 'https://www.geeksforgeeks.org/reverse-a-linked-list/', level: 'Easy' },
        { title: 'Detect Cycle', description: 'Floyd cycle detection', youtubeUrl: 'https://www.youtube.com/watch?v=zbozWoMgKW0', practiceUrl: 'https://leetcode.com/problems/linked-list-cycle/', articleUrl: 'https://www.geeksforgeeks.org/detect-loop-in-a-linked-list/', level: 'Medium' },
        { title: 'Merge Two Lists', description: 'Merge sorted linked lists', youtubeUrl: 'https://www.youtube.com/watch?v=L8J10z7-ZLc', practiceUrl: 'https://leetcode.com/problems/merge-two-sorted-lists/', articleUrl: 'https://www.geeksforgeeks.org/merge-two-sorted-linked-lists/', level: 'Easy' },
      ],
    },
    {
      name: 'Stacks & Queues',
      chapter: 'Data Structures',
      problems: [
        { title: 'Valid Parentheses', description: 'Check balanced brackets', youtubeUrl: 'https://www.youtube.com/watch?v=WTzjpsuYd30', practiceUrl: 'https://leetcode.com/problems/valid-parentheses/', articleUrl: 'https://www.geeksforgeeks.org/check-for-balanced-parentheses/', level: 'Easy' },
        { title: 'Implement Queue using Stack', description: 'FIFO from LIFO', youtubeUrl: 'https://www.youtube.com/watch?v=cJ3DXBYVKfY', practiceUrl: 'https://leetcode.com/problems/implement-queue-using-stacks/', articleUrl: 'https://www.geeksforgeeks.org/queue-using-stacks/', level: 'Medium' },
        { title: 'Min Stack', description: 'Get min in O(1)', youtubeUrl: 'https://www.youtube.com/watch?v=P2nKRkHQFfg', practiceUrl: 'https://leetcode.com/problems/min-stack/', articleUrl: 'https://www.geeksforgeeks.org/design-a-stack-that-supports-getmin-in-o1-time-and-o1-extra-space/', level: 'Medium' },
      ],
    },
    {
      name: 'Trees',
      chapter: 'Data Structures',
      problems: [
        { title: 'Level Order Traversal', description: 'BFS on tree', youtubeUrl: 'https://www.youtube.com/watch?v=86g_jZIcQWE', practiceUrl: 'https://leetcode.com/problems/binary-tree-level-order-traversal/', articleUrl: 'https://www.geeksforgeeks.org/level-order-tree-traversal/', level: 'Medium' },
        { title: 'Lowest Common Ancestor', description: 'Find LCA of two nodes', youtubeUrl: 'https://www.youtube.com/watch?v=TIoCCStdkQc', practiceUrl: 'https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/', articleUrl: 'https://www.geeksforgeeks.org/lowest-common-ancestor-in-a-binary-tree/', level: 'Medium' },
        { title: 'Binary Tree Path Sum', description: 'Path from root to leaf', youtubeUrl: 'https://www.youtube.com/watch?v=dwysAYWlaV4', practiceUrl: 'https://leetcode.com/problems/path-sum/', articleUrl: 'https://www.geeksforgeeks.org/root-to-leaf-path-sum-equal-to-a-given-number/', level: 'Medium' },
      ],
    },
    {
      name: 'Graphs',
      chapter: 'Data Structures',
      problems: [
          { title: 'BFS Traversal', description: 'Breadth First Search', youtubeUrl: 'https://youtu.be/0_SIA72bAhk?si=UmRfyf33ucGiseZg', practiceUrl: 'https://leetcode.com/problems/binary-tree-level-order-traversal/', articleUrl: 'https://www.geeksforgeeks.org/breadth-first-search-or-bfs-for-a-graph/', level: 'Medium' },
          { title: 'DFS Traversal', description: 'Depth First Search', youtubeUrl: 'https://youtu.be/UWqjBUxuniM?si=jU0THTlrOLBU3Dn0', practiceUrl: 'https://leetcode.com/problems/number-of-islands/', articleUrl: 'https://www.geeksforgeeks.org/depth-first-search-or-dfs-for-a-graph/', level: 'Medium' },
        { title: 'Dijkstra Algorithm', description: 'Shortest path algorithm', youtubeUrl: 'https://www.youtube.com/watch?v=_cher07AsJ4', practiceUrl: 'https://leetcode.com/problems/network-delay-time/', articleUrl: 'https://www.geeksforgeeks.org/dijkstras-shortest-path-algorithm-greedy-algo-7/', level: 'Tough' },
      ],
    },
    {
      name: 'SQL Queries',
      chapter: 'Databases',
      problems: [
        { title: 'Basic SELECT', description: 'SELECT with WHERE clause', youtubeUrl: 'https://www.youtube.com/watch?v=19vT9Ng2ujU', practiceUrl: 'https://leetcode.com/problems/combine-two-tables/', articleUrl: 'https://www.geeksforgeeks.org/sql-select-statement/', level: 'Easy' },
        { title: 'JOINs in SQL', description: 'INNER, LEFT, RIGHT, FULL JOINs', youtubeUrl: 'https://www.youtube.com/watch?v=9yeOJ0Zs8cY', practiceUrl: 'https://leetcode.com/problems/employees-earning-more-than-their-managers/', articleUrl: 'https://www.geeksforgeeks.org/sql-join-set-1-inner-left-right-and-full-joins/', level: 'Medium' },
        { title: 'Aggregation Functions', description: 'COUNT, SUM, AVG, MAX, MIN', youtubeUrl: 'https://www.youtube.com/watch?v=ZlV_6pyfhfM', practiceUrl: 'https://leetcode.com/problems/customer-who-visited-but-did-not-make-any-transactions/', articleUrl: 'https://www.geeksforgeeks.org/sql-aggregate-functions/', level: 'Medium' },
      ],
    },
  ];

  await Topic.insertMany(topics);
  console.log(`✅ Seeded ${topics.length} topics with comprehensive DSA content!`);
  process.exit(0);
}).catch(err => {
  console.error('Error:', err.message);
  process.exit(1);
});
