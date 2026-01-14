import express from 'express';
import Topic from '../models/Topic.js';
import User from '../models/User.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

// Seed some sample topics/problems (for quick demo)
router.post('/seed', async (req, res) => {
  try {
    const existing = await Topic.findOne();
    if (existing) {
      return res.status(400).json({ message: 'Topics already seeded' });
    }

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

      // Data Structures
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
          { title: 'Lowest Common Ancestor', description: 'Find LCA of two nodes', youtubeUrl: 'https://www.youtube.com/watch?v=py3R23aAPCA', practiceUrl: 'https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/', articleUrl: 'https://www.geeksforgeeks.org/lowest-common-ancestor-in-a-binary-tree/', level: 'Medium' },
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
        name: 'Hash Tables',
        chapter: 'Data Structures',
        problems: [
          { title: 'Valid Anagram', description: 'Check if strings are anagrams', youtubeUrl: 'https://www.youtube.com/watch?v=9UtInBqnCEA', practiceUrl: 'https://leetcode.com/problems/valid-anagram/', articleUrl: 'https://www.geeksforgeeks.org/check-whether-two-strings-are-anagram-of-each-other/', level: 'Easy' },
          { title: 'Group Anagrams', description: 'Group strings by anagram', youtubeUrl: 'https://www.youtube.com/watch?v=vzdNOK2oB2E', practiceUrl: 'https://leetcode.com/problems/group-anagrams/', articleUrl: 'https://www.geeksforgeeks.org/group-anagrams-together/', level: 'Medium' },
          { title: 'First Unique Char', description: 'Find first non-repeating char', youtubeUrl: 'https://www.youtube.com/watch?v=ysGaFHfkjzc', practiceUrl: 'https://leetcode.com/problems/first-unique-character-in-a-string/', articleUrl: 'https://www.geeksforgeeks.org/find-first-non-repeating-character-of-given-string/', level: 'Easy' },
        ],
      },

      // Databases
      {
        name: 'SQL Queries',
        chapter: 'Databases',
        problems: [
          { title: 'Basic SELECT', description: 'SELECT with WHERE clause', youtubeUrl: 'https://www.youtube.com/watch?v=19vT9Ng2ujU', practiceUrl: 'https://leetcode.com/problems/combine-two-tables/', articleUrl: 'https://www.geeksforgeeks.org/sql-select-statement/', level: 'Easy' },
          { title: 'JOINs in SQL', description: 'INNER, LEFT, RIGHT, FULL JOINs', youtubeUrl: 'https://www.youtube.com/watch?v=9yeOJ0Zs8cY', practiceUrl: 'https://leetcode.com/problems/employees-earning-more-than-their-managers/', articleUrl: 'https://www.geeksforgeeks.org/sql-join-set-1-inner-left-right-and-full-joins/', level: 'Medium' },
          { title: 'Aggregation Functions', description: 'COUNT, SUM, AVG, MAX, MIN', youtubeUrl: 'https://www.youtube.com/watch?v=ZlV_6pyfhfM', practiceUrl: 'https://leetcode.com/problems/customer-who-visited-but-did-not-make-any-transactions/', articleUrl: 'https://www.geeksforgeeks.org/sql-aggregate-functions/', level: 'Medium' },
        ],
      },
      {
        name: 'Indexing & Optimization',
        chapter: 'Databases',
        problems: [
          { title: 'Database Indexes', description: 'Improve query performance', youtubeUrl: 'https://www.youtube.com/watch?v=fsG1XaZxSDE', practiceUrl: 'https://codeforces.com/problemset/problem/1475/B', articleUrl: 'https://www.geeksforgeeks.org/sql-indexes/', level: 'Tough' },
          { title: 'Query Optimization', description: 'Write efficient queries', youtubeUrl: 'https://www.youtube.com/watch?v=lfZYLU58PXE', practiceUrl: 'https://codeforces.com/problemset/problem/1475/C', articleUrl: 'https://www.geeksforgeeks.org/sql-query-optimization/', level: 'Tough' },
          { title: 'Normalization', description: 'Database normalization techniques', youtubeUrl: 'https://www.youtube.com/watch?v=qI_g07C_Q5g', practiceUrl: 'https://codeforces.com/problemset/problem/1475/D', articleUrl: 'https://www.geeksforgeeks.org/database-normalization-normal-forms/', level: 'Tough' },
        ],
      },

      // Machine Learning (basic)
      {
        name: 'Supervised Learning',
        chapter: 'Machine Learning',
        problems: [
          { title: 'Linear Regression', description: 'Predict continuous values', youtubeUrl: 'https://www.youtube.com/watch?v=nk2CQITm_eo', practiceUrl: 'https://kaggle.com/learn/linear-regression', articleUrl: 'https://www.geeksforgeeks.org/linear-regression-vs-logistic-regression/', level: 'Medium' },
          { title: 'Logistic Regression', description: 'Binary classification', youtubeUrl: 'https://www.youtube.com/watch?v=jbluHIgBmBo', practiceUrl: 'https://kaggle.com/learn/logistic-regression', articleUrl: 'https://www.geeksforgeeks.org/logistic-regression/', level: 'Medium' },
          { title: 'Decision Trees', description: 'Tree-based classification', youtubeUrl: 'https://www.youtube.com/watch?v=7VeUPuFGJHk', practiceUrl: 'https://kaggle.com/learn/decision-trees', articleUrl: 'https://www.geeksforgeeks.org/decision-tree/', level: 'Medium' },
        ],
      },
      {
        name: 'Unsupervised Learning',
        chapter: 'Machine Learning',
        problems: [
          { title: 'K-Means Clustering', description: 'Partition data into clusters', youtubeUrl: 'https://www.youtube.com/watch?v=4b5d3muVZ88', practiceUrl: 'https://kaggle.com/learn/unsupervised-learning', articleUrl: 'https://www.geeksforgeeks.org/k-means-clustering-introduction/', level: 'Medium' },
          { title: 'Principal Component Analysis', description: 'Dimensionality reduction', youtubeUrl: 'https://www.youtube.com/watch?v=FgakZw6K1QQ', practiceUrl: 'https://kaggle.com/learn/feature-engineering', articleUrl: 'https://www.geeksforgeeks.org/principal-component-analysis/', level: 'Tough' },
          { title: 'Hierarchical Clustering', description: 'Agglomerative/Divisive clustering', youtubeUrl: 'https://www.youtube.com/watch?v=7xHsRkOdVwo', practiceUrl: 'https://kaggle.com/learn/clustering', articleUrl: 'https://www.geeksforgeeks.org/hierarchical-clustering/', level: 'Tough' },
        ],
      },

      // Operating Systems
      {
        name: 'Process Management',
        chapter: 'Operating Systems',
        problems: [
          { title: 'Process Scheduling', description: 'FCFS, SJF, Round Robin', youtubeUrl: 'https://www.youtube.com/watch?v=p0DhMnDvqnc', practiceUrl: 'https://codeforces.com/problemset/problem/1500/A', articleUrl: 'https://www.geeksforgeeks.org/cpu-scheduling-in-operating-systems/', level: 'Medium' },
          { title: 'Deadlock Handling', description: 'Detect and prevent deadlocks', youtubeUrl: 'https://www.youtube.com/watch?v=UVo_Fs0K42c', practiceUrl: 'https://codeforces.com/problemset/problem/1500/B', articleUrl: 'https://www.geeksforgeeks.org/deadlock-in-operating-system/', level: 'Tough' },
          { title: 'Memory Management', description: 'Paging, segmentation, virtual memory', youtubeUrl: 'https://www.youtube.com/watch?v=yKODq52QRGQ', practiceUrl: 'https://codeforces.com/problemset/problem/1500/C', articleUrl: 'https://www.geeksforgeeks.org/memory-management-in-operating-system/', level: 'Tough' },
        ],
      },
      {
        name: 'File Systems',
        chapter: 'Operating Systems',
        problems: [
          { title: 'File Organization', description: 'Sequential, indexed, hashed', youtubeUrl: 'https://www.youtube.com/watch?v=mPiTMG_4dJM', practiceUrl: 'https://codeforces.com/problemset/problem/1500/D', articleUrl: 'https://www.geeksforgeeks.org/file-organization/', level: 'Medium' },
          { title: 'Directory Structure', description: 'Single level, two level, tree', youtubeUrl: 'https://www.youtube.com/watch?v=N-mqpMh5fEU', practiceUrl: 'https://codeforces.com/problemset/problem/1500/E', articleUrl: 'https://www.geeksforgeeks.org/directory-structure-in-os/', level: 'Medium' },
          { title: 'Disk Scheduling', description: 'FCFS, SSTF, SCAN, C-SCAN', youtubeUrl: 'https://www.youtube.com/watch?v=M7LFXW5WqVE', practiceUrl: 'https://codeforces.com/problemset/problem/1500/F', articleUrl: 'https://www.geeksforgeeks.org/disk-scheduling-algorithms/', level: 'Tough' },
        ],
      },

      // Networks
      {
        name: 'Network Protocols',
        chapter: 'Networks',
        problems: [
          { title: 'TCP/IP Model', description: 'Layers and protocols', youtubeUrl: 'https://www.youtube.com/watch?v=PwQ1mofUs7o', practiceUrl: 'https://codeforces.com/problemset/problem/1600/A', articleUrl: 'https://www.geeksforgeeks.org/tcp-ip-model/', level: 'Easy' },
          { title: 'DNS Resolution', description: 'Domain name to IP mapping', youtubeUrl: 'https://www.youtube.com/watch?v=mpQZVYPuDGU', practiceUrl: 'https://codeforces.com/problemset/problem/1600/B', articleUrl: 'https://www.geeksforgeeks.org/dns-query/', level: 'Medium' },
          { title: 'Routing Algorithms', description: 'RIP, OSPF, BGP', youtubeUrl: 'https://www.youtube.com/watch?v=k0ZKnZ18Fxw', practiceUrl: 'https://codeforces.com/problemset/problem/1600/C', articleUrl: 'https://www.geeksforgeeks.org/routing-protocols-similarities-and-differences/', level: 'Tough' },
        ],
      },
      {
        name: 'Network Security',
        chapter: 'Networks',
        problems: [
          { title: 'Encryption Methods', description: 'Symmetric & Asymmetric', youtubeUrl: 'https://www.youtube.com/watch?v=O4xNJsjtN6E', practiceUrl: 'https://codeforces.com/problemset/problem/1600/D', articleUrl: 'https://www.geeksforgeeks.org/encryption-decryption/', level: 'Medium' },
          { title: 'Firewalls', description: 'Packet filtering, stateful inspection', youtubeUrl: 'https://www.youtube.com/watch?v=kDEX1HY3xB8', practiceUrl: 'https://codeforces.com/problemset/problem/1600/E', articleUrl: 'https://www.geeksforgeeks.org/firewall-in-computer-network/', level: 'Medium' },
          { title: 'VPN & SSL', description: 'Virtual private networks', youtubeUrl: 'https://www.youtube.com/watch?v=OAHwW-W1Q1A', practiceUrl: 'https://codeforces.com/problemset/problem/1600/F', articleUrl: 'https://www.geeksforgeeks.org/virtual-private-network-vpn/', level: 'Tough' },
        ],
      },

      // Mathematics
      {
        name: 'Number Theory',
        chapter: 'Mathematics',
        problems: [
          { title: 'Prime Numbers', description: 'Sieve of Eratosthenes', youtubeUrl: 'https://www.youtube.com/watch?v=klcIklsWzrY', practiceUrl: 'https://leetcode.com/problems/count-primes/', articleUrl: 'https://www.geeksforgeeks.org/prime-numbers-using-sieve-of-eratosthenes/', level: 'Easy' },
          { title: 'GCD and LCM', description: 'Euclidean algorithm', youtubeUrl: 'https://www.youtube.com/watch?v=1xNbjMdbjug', practiceUrl: 'https://leetcode.com/problems/number-of-steps-to-reduce-a-number-to-zero/', articleUrl: 'https://www.geeksforgeeks.org/euclidean-algorithm/', level: 'Easy' },
          { title: 'Modular Arithmetic', description: 'Modular exponentiation', youtubeUrl: 'https://www.youtube.com/watch?v=toH8uQsla9Y', practiceUrl: 'https://codeforces.com/problemset/problem/1700/A', articleUrl: 'https://www.geeksforgeeks.org/modular-exponentiation-power-in-modular-arithmetic/', level: 'Medium' },
        ],
      },
      {
        name: 'Combinatorics',
        chapter: 'Mathematics',
        problems: [
          { title: 'Permutations', description: 'n! and nPr', youtubeUrl: 'https://www.youtube.com/watch?v=BDki_7iRaZw', practiceUrl: 'https://leetcode.com/problems/permutations/', articleUrl: 'https://www.geeksforgeeks.org/permutation-and-combination/', level: 'Medium' },
          { title: 'Combinations', description: 'nCr and Pascal triangle', youtubeUrl: 'https://www.youtube.com/watch?v=XMRCHgB03k0', practiceUrl: 'https://leetcode.com/problems/combinations/', articleUrl: 'https://www.geeksforgeeks.org/combination-sum/', level: 'Medium' },
          { title: 'Catalan Numbers', description: 'Counting sequences', youtubeUrl: 'https://www.youtube.com/watch?v=k3KX1aqWkFI', practiceUrl: 'https://codeforces.com/problemset/problem/1800/A', articleUrl: 'https://www.geeksforgeeks.org/catalan-numbers/', level: 'Tough' },
        ],
      },

      // Software Engineering
      {
        name: 'Design Patterns',
        chapter: 'Software Engineering',
        problems: [
          { title: 'Singleton Pattern', description: 'Single instance class', youtubeUrl: 'https://www.youtube.com/watch?v=hUE_j6QTSJM', practiceUrl: 'https://codeforces.com/problemset/problem/1900/A', articleUrl: 'https://www.geeksforgeeks.org/singleton-design-pattern/', level: 'Easy' },
          { title: 'Factory Pattern', description: 'Object creation abstraction', youtubeUrl: 'https://www.youtube.com/watch?v=v_2zay-gJ9M', practiceUrl: 'https://codeforces.com/problemset/problem/1900/B', articleUrl: 'https://www.geeksforgeeks.org/factory-method-design-pattern/', level: 'Medium' },
          { title: 'Observer Pattern', description: 'Event-driven programming', youtubeUrl: 'https://www.youtube.com/watch?v=_BpmfnqjgzQ', practiceUrl: 'https://codeforces.com/problemset/problem/1900/C', articleUrl: 'https://www.geeksforgeeks.org/observer-pattern-set-1-introduction/', level: 'Medium' },
        ],
      },
      {
        name: 'SOLID Principles',
        chapter: 'Software Engineering',
        problems: [
          { title: 'Single Responsibility', description: 'One reason to change', youtubeUrl: 'https://www.youtube.com/watch?v=UQnQzUftV6Q', practiceUrl: 'https://codeforces.com/problemset/problem/1900/D', articleUrl: 'https://www.geeksforgeeks.org/solid-principle-in-programming-understand-with-real-life-examples/', level: 'Medium' },
          { title: 'Open-Closed Principle', description: 'Open for extension, closed for modification', youtubeUrl: 'https://www.youtube.com/watch?v=VFlwuKii_tE', practiceUrl: 'https://codeforces.com/problemset/problem/1900/E', articleUrl: 'https://www.geeksforgeeks.org/open-closed-principle-in-oops/', level: 'Medium' },
          { title: 'Dependency Inversion', description: 'Depend on abstractions', youtubeUrl: 'https://www.youtube.com/watch?v=Kv5jhbSkqLE', practiceUrl: 'https://codeforces.com/problemset/problem/1900/F', articleUrl: 'https://www.geeksforgeeks.org/dependency-inversion-principle/', level: 'Tough' },
        ],
      },

      // Web Development
      {
        name: 'Frontend Development',
        chapter: 'Web Development',
        problems: [
          { title: 'HTML Basics', description: 'Structure and semantics', youtubeUrl: 'https://www.youtube.com/watch?v=qz0aGYrrlhU', practiceUrl: 'https://www.w3schools.com/html/', articleUrl: 'https://www.geeksforgeeks.org/html-introduction/', level: 'Easy' },
          { title: 'CSS Styling', description: 'Layouts, flexbox, grid', youtubeUrl: 'https://www.youtube.com/watch?v=1Rs2ND1-5c8', practiceUrl: 'https://www.w3schools.com/css/', articleUrl: 'https://www.geeksforgeeks.org/css-introduction/', level: 'Easy' },
          { title: 'JavaScript DOM', description: 'DOM manipulation and events', youtubeUrl: 'https://www.youtube.com/watch?v=DHvZLI7Kyw', practiceUrl: 'https://www.w3schools.com/js/', articleUrl: 'https://www.geeksforgeeks.org/dom-document-object-model/', level: 'Medium' },
        ],
      },
      {
        name: 'Backend Development',
        chapter: 'Web Development',
        problems: [
          { title: 'REST API Design', description: 'HTTP methods and status codes', youtubeUrl: 'https://www.youtube.com/watch?v=PzAmXM_8UZA', practiceUrl: 'https://codeforces.com/problemset/problem/2000/A', articleUrl: 'https://www.geeksforgeeks.org/rest-api-introduction/', level: 'Medium' },
          { title: 'Database Connections', description: 'ORM and query building', youtubeUrl: 'https://www.youtube.com/watch?v=qy0PZwqcaIo', practiceUrl: 'https://codeforces.com/problemset/problem/2000/B', articleUrl: 'https://www.geeksforgeeks.org/introduction-to-orm-object-relational-mapping/', level: 'Medium' },
          { title: 'Authentication & Sessions', description: 'JWT and OAuth', youtubeUrl: 'https://www.youtube.com/watch?v=PoRVcW9szS0', practiceUrl: 'https://codeforces.com/problemset/problem/2000/C', articleUrl: 'https://www.geeksforgeeks.org/jwt-full-form/', level: 'Medium' },
        ],
      },

      // Cloud Computing
      {
        name: 'Cloud Architecture',
        chapter: 'Cloud Computing',
        problems: [
          { title: 'IaaS, PaaS, SaaS', description: 'Cloud service models', youtubeUrl: 'https://www.youtube.com/watch?v=36zducUX16w', practiceUrl: 'https://codeforces.com/problemset/problem/2100/A', articleUrl: 'https://www.geeksforgeeks.org/cloud-computing-service-models/', level: 'Easy' },
          { title: 'AWS Services', description: 'EC2, S3, RDS, Lambda', youtubeUrl: 'https://www.youtube.com/watch?v=xfQ3bqisYLU', practiceUrl: 'https://aws.amazon.com/getting-started/', articleUrl: 'https://www.geeksforgeeks.org/aws-introduction/', level: 'Medium' },
          { title: 'Microservices', description: 'Service-oriented architecture', youtubeUrl: 'https://www.youtube.com/watch?v=gSvqYAJ7KNM', practiceUrl: 'https://codeforces.com/problemset/problem/2100/B', articleUrl: 'https://www.geeksforgeeks.org/microservices-architecture/', level: 'Tough' },
        ],
      },
      {
        name: 'DevOps & CI/CD',
        chapter: 'Cloud Computing',
        problems: [
          { title: 'Docker Containers', description: 'Containerization basics', youtubeUrl: 'https://www.youtube.com/watch?v=Gjnd7IIn-K8', practiceUrl: 'https://docs.docker.com/get-started/', articleUrl: 'https://www.geeksforgeeks.org/containerization-using-docker/', level: 'Medium' },
          { title: 'Kubernetes Orchestration', description: 'Container orchestration', youtubeUrl: 'https://www.youtube.com/watch?v=d6WC5n9G_sM', practiceUrl: 'https://kubernetes.io/docs/tutorials/', articleUrl: 'https://www.geeksforgeeks.org/introduction-to-kubernetes/', level: 'Tough' },
          { title: 'CI/CD Pipelines', description: 'GitHub Actions, Jenkins, GitLab', youtubeUrl: 'https://www.youtube.com/watch?v=fDKEVlrywdU', practiceUrl: 'https://github.com/features/actions', articleUrl: 'https://www.geeksforgeeks.org/continuous-integration-continuous-delivery-and-continuous-deployment/', level: 'Tough' },
        ],
      },
    ];

    const created = await Topic.insertMany(topics);
    res.status(201).json(created);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all topics with problems plus user progress
router.get('/', authMiddleware, async (req, res) => {
  try {
    const topics = await Topic.find().lean();
    const user = req.user;

    const progressMap = {};
    user.progress.forEach((p) => {
      progressMap[p.problemId.toString()] = p.completed;
    });

    const data = topics.map((topic) => ({
      ...topic,
      problems: topic.problems.map((p) => ({
        ...p,
        completed: progressMap[p._id.toString()] || false,
      })),
    }));

    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Toggle completion of a problem for current user
router.post('/:problemId/toggle', authMiddleware, async (req, res) => {
  try {
    const { problemId } = req.params;
    const user = await User.findById(req.user._id);

    const existing = user.progress.find(
      (p) => p.problemId.toString() === problemId
    );

    if (existing) {
      existing.completed = !existing.completed;
    } else {
      user.progress.push({ problemId, completed: true });
    }

    await user.save();
    res.json({ problemId, completed: existing ? existing.completed : true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;

