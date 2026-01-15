import express from 'express';
import Topic from '../models/Topic.js';
import User from '../models/User.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

// Seed some sample topics/problems (for quick demo)
router.post('/seed', async (req, res) => {
  try {
    // Delete all existing topics first
    await Topic.deleteMany({});

    const topics = [
      // Algorithms
      {
        name: 'Sorting',
        chapter: 'Core DSA',
        problems: [
          { title: 'Bubble Sort', description: 'Basic sorting algorithm', youtubeUrl: 'https://youtu.be/Jdtq5uKz-w4?si=17CUWx9DEQvtUwYC', practiceUrl: 'https://leetcode.com/problems/sort-an-array/', articleUrl: 'https://www.geeksforgeeks.org/bubble-sort/', level: 'Easy' },
          { title: 'Merge Sort', description: 'Divide and conquer sorting', youtubeUrl: 'https://youtu.be/TzeBrDU-JaY?si=9T18lFxVU6N2I2wF', practiceUrl: 'https://leetcode.com/problems/sort-an-array/', articleUrl: 'https://www.geeksforgeeks.org/merge-sort/', level: 'Medium' },
          { title: 'Quick Sort', description: 'Efficient partition-based sorting', youtubeUrl: 'https://youtu.be/7h1s2SojIRw?si=kCEXiNABUch0oeeq', practiceUrl: 'https://leetcode.com/problems/sort-an-array/', articleUrl: 'https://www.geeksforgeeks.org/quick-sort/', level: 'Medium' },
        ],
      },
      {
        name: 'Search & DP',
        chapter: 'Core DSA',
        problems: [
          { title: 'Binary Search', description: 'Efficient search on sorted array', youtubeUrl: 'https://youtu.be/j5uXyPJ0Pew?si=83SwzET88NVLh6z0', practiceUrl: 'https://leetcode.com/problems/binary-search/', articleUrl: 'https://www.geeksforgeeks.org/binary-search/', level: 'Easy' },
          { title: 'Fibonacci DP', description: 'Classic DP problem', youtubeUrl: 'https://youtu.be/5dRGRueKU3M?si=N0DJokUAkQUC3LNE', practiceUrl: 'https://leetcode.com/problems/fibonacci-number/', articleUrl: 'https://www.geeksforgeeks.org/dynamic-programming/', level: 'Easy' },
          { title: '0/1 Knapsack', description: 'Optimize weight selection', youtubeUrl: 'https://youtu.be/nLmhmB6NzcM?si=p23g4e1Xj7WZ_Fv5', practiceUrl: 'https://leetcode.com/problems/partition-equal-subset-sum/', articleUrl: 'https://www.geeksforgeeks.org/0-1-knapsack-problem/', level: 'Medium' },
        ],
      },

      // Data Structures
      {
        name: 'Arrays & Linked Lists',
        chapter: 'Core DSA',
        problems: [
          { title: 'Two Sum', description: 'Find pair with target sum', youtubeUrl: 'https://youtu.be/WB2SZ3_QK28?si=LXzOtqVBv6zQJIEC', practiceUrl: 'https://leetcode.com/problems/two-sum/', articleUrl: 'https://www.geeksforgeeks.org/two-sum-problem/', level: 'Easy' },
          { title: 'Reverse Linked List', description: 'Reverse a linked list', youtubeUrl: 'https://youtu.be/G0_I-ZF0S38?si=Q82jRod8I0c4QBGR', practiceUrl: 'https://leetcode.com/problems/reverse-linked-list/', articleUrl: 'https://www.geeksforgeeks.org/reverse-a-linked-list/', level: 'Easy' },
        ],
      },
      {
        name: 'Graphs',
        chapter: 'Core DSA',
        problems: [
          { title: 'BFS Traversal', description: 'Breadth First Search', youtubeUrl: 'https://youtu.be/0_SIA72bAhk?si=UmRfyf33ucGiseZg', practiceUrl: 'https://leetcode.com/problems/binary-tree-level-order-traversal/', articleUrl: 'https://www.geeksforgeeks.org/breadth-first-search-or-bfs-for-a-graph/', level: 'Medium' },
          { title: 'DFS Traversal', description: 'Depth First Search', youtubeUrl: 'https://youtu.be/UWqjBUxuniM?si=jU0THTlrOLBU3Dn0', practiceUrl: 'https://leetcode.com/problems/number-of-islands/', articleUrl: 'https://www.geeksforgeeks.org/depth-first-search-or-dfs-for-a-graph/', level: 'Medium' },
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

