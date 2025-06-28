import { Algorithm } from '../types';

export const algorithms: Algorithm[] = [
  {
    id: 'linear-regression',
    name: 'Linear Regression',
    category: 'Supervised Learning',
    description: 'A fundamental algorithm for predicting continuous values by finding the best-fitting line through data points using gradient descent optimization.',
    icon: 'TrendingUp',
    complexity: 'Beginner',
    useCase: 'Predicting house prices, sales forecasting, risk assessment, trend analysis',
    pros: ['Simple to understand and implement', 'Fast training and prediction', 'Good baseline model', 'Interpretable results', 'No hyperparameter tuning needed'],
    cons: ['Assumes linear relationship', 'Sensitive to outliers', 'May not capture complex patterns', 'Requires feature scaling'],
    steps: [
      {
        id: 1,
        title: 'Data Preparation & Initialization',
        description: 'Collect and prepare your dataset with features (X) and target values (y). Initialize parameters (slope and intercept) with random values.',
        animation: 'slideInLeft',
        code: 'θ₀ = random(), θ₁ = random(), α = 0.01'
      },
      {
        id: 2,
        title: 'Forward Pass - Make Predictions',
        description: 'For each data point, calculate the predicted value using current parameters: ŷ = θ₀ + θ₁ × x',
        animation: 'fadeInUp',
        code: 'for i in range(m): predictions[i] = θ₀ + θ₁ * X[i]'
      },
      {
        id: 3,
        title: 'Calculate Cost Function',
        description: 'Compute the Mean Squared Error (MSE) between predicted and actual values to measure model performance.',
        animation: 'slideInRight',
        code: 'cost = (1/2m) * Σ(predictions[i] - y[i])²'
      },
      {
        id: 4,
        title: 'Compute Gradients',
        description: 'Calculate the partial derivatives of the cost function with respect to each parameter to determine update direction.',
        animation: 'bounceIn',
        code: '∂J/∂θ₀ = (1/m) * Σ(ŷ - y), ∂J/∂θ₁ = (1/m) * Σ((ŷ - y) * x)'
      },
      {
        id: 5,
        title: 'Update Parameters',
        description: 'Use gradient descent to adjust parameters in the direction that minimizes the cost function.',
        animation: 'rotateIn',
        code: 'θ₀ = θ₀ - α * ∂J/∂θ₀, θ₁ = θ₁ - α * ∂J/∂θ₁'
      },
      {
        id: 6,
        title: 'Iterate Until Convergence',
        description: 'Repeat steps 2-5 until the cost function converges or reaches maximum iterations.',
        animation: 'slideInUp',
        code: 'while |cost_change| > tolerance and iter < max_iter'
      }
    ],
    mathematicalExample: {
      title: 'House Price Prediction Example',
      dataset: {
        description: 'Predicting house prices based on size (square feet)',
        features: ['Size (sq ft)', 'Price ($)'],
        data: [
          [1000, 150000],
          [1200, 180000],
          [1500, 225000],
          [1800, 270000],
          [2000, 300000]
        ]
      },
      calculations: [
        {
          step: 1,
          title: 'Initialize Parameters',
          formula: 'θ₀ = 0, θ₁ = 0, α = 0.0001',
          calculation: 'Starting with zero weights and learning rate 0.0001',
          result: 'θ₀ = 0, θ₁ = 0',
          explanation: 'We start with zero parameters and will learn the optimal values through gradient descent.'
        },
        {
          step: 2,
          title: 'First Prediction',
          formula: 'ŷ = θ₀ + θ₁ × x',
          calculation: 'ŷ₁ = 0 + 0 × 1000 = 0',
          result: '0',
          explanation: 'With zero parameters, our initial predictions are all zero, which is clearly wrong.'
        },
        {
          step: 3,
          title: 'Calculate Cost (MSE)',
          formula: 'J = (1/2m) × Σ(ŷᵢ - yᵢ)²',
          calculation: 'J = (1/10) × [(0-150000)² + (0-180000)² + ... ] = 5.145 × 10¹⁰',
          result: '51,450,000,000',
          explanation: 'The initial cost is very high because our predictions are far from actual values.'
        },
        {
          step: 4,
          title: 'Compute Gradients',
          formula: '∂J/∂θ₀ = (1/m) × Σ(ŷᵢ - yᵢ), ∂J/∂θ₁ = (1/m) × Σ((ŷᵢ - yᵢ) × xᵢ)',
          calculation: '∂J/∂θ₀ = -225000, ∂J/∂θ₁ = -337,500,000',
          result: '∂J/∂θ₀ = -225000, ∂J/∂θ₁ = -337,500,000',
          explanation: 'Negative gradients indicate we need to increase both parameters to reduce cost.'
        },
        {
          step: 5,
          title: 'Update Parameters',
          formula: 'θ₀ = θ₀ - α × ∂J/∂θ₀, θ₁ = θ₁ - α × ∂J/∂θ₁',
          calculation: 'θ₀ = 0 - 0.0001 × (-225000) = 22.5, θ₁ = 0 - 0.0001 × (-337,500,000) = 33.75',
          result: 'θ₀ = 22.5, θ₁ = 33.75',
          explanation: 'After one iteration, we have learned some relationship between size and price.'
        },
        {
          step: 6,
          title: 'New Prediction',
          formula: 'ŷ = θ₀ + θ₁ × x',
          calculation: 'ŷ₁ = 22.5 + 33.75 × 1000 = 33,772.5',
          result: '$33,772.5',
          explanation: 'Our prediction is now much closer to the actual price of $150,000. We continue this process until convergence.'
        }
      ],
      finalResult: 'After many iterations, the algorithm converges to θ₀ ≈ 30,000 and θ₁ ≈ 135, giving us the equation: Price = 30,000 + 135 × Size. This means the base price is $30,000 and each square foot adds $135 to the price.'
    }
  },
  {
    id: 'decision-tree',
    name: 'Decision Tree',
    category: 'Supervised Learning',
    description: 'A tree-like model that makes decisions by recursively splitting data based on feature values that maximize information gain.',
    icon: 'GitBranch',
    complexity: 'Intermediate',
    useCase: 'Medical diagnosis, customer segmentation, feature selection, rule extraction',
    pros: ['Easy to understand and visualize', 'Requires minimal data preparation', 'Handles both numerical and categorical data', 'Provides feature importance', 'No assumptions about data distribution'],
    cons: ['Prone to overfitting', 'Unstable (small data changes can result in different trees)', 'Biased toward features with many levels', 'Can create overly complex trees'],
    steps: [
      {
        id: 1,
        title: 'Start with Root Node',
        description: 'Begin with all training data at the root node of the tree. This represents the entire dataset before any splits.',
        animation: 'fadeInDown',
        code: 'root = Node(data=training_set, depth=0)'
      },
      {
        id: 2,
        title: 'Choose Best Split',
        description: 'Find the feature and threshold that best separates the data using information gain, Gini impurity, or entropy measures.',
        animation: 'slideInLeft',
        code: 'best_feature, best_threshold = argmax(information_gain(feature, threshold))'
      },
      {
        id: 3,
        title: 'Split the Data',
        description: 'Divide the data into subsets based on the chosen feature and threshold value.',
        animation: 'zoomIn',
        code: 'left_data = data[feature <= threshold], right_data = data[feature > threshold]'
      },
      {
        id: 4,
        title: 'Create Child Nodes',
        description: 'Create left and right child nodes for the split data subsets and assign them to the current node.',
        animation: 'slideInRight',
        code: 'node.left = Node(left_data), node.right = Node(right_data)'
      },
      {
        id: 5,
        title: 'Recursive Splitting',
        description: 'Repeat the splitting process for each child node until stopping criteria are met (max depth, min samples, etc.).',
        animation: 'bounceIn',
        code: 'if not stopping_criteria: recursively_split(child_nodes)'
      },
      {
        id: 6,
        title: 'Assign Class Labels',
        description: 'Assign the majority class (for classification) or average value (for regression) to leaf nodes.',
        animation: 'fadeInUp',
        code: 'leaf.prediction = majority_class(leaf_data) or mean(leaf_data)'
      }
    ],
    mathematicalExample: {
      title: 'Loan Approval Decision Tree',
      dataset: {
        description: 'Predicting loan approval based on applicant characteristics',
        features: ['Age', 'Income', 'Credit Score', 'Approved'],
        data: [
          [25, 35000, 650, 0],
          [35, 55000, 720, 1],
          [45, 75000, 780, 1],
          [28, 40000, 680, 0],
          [52, 85000, 800, 1],
          [30, 45000, 700, 1],
          [38, 60000, 750, 1],
          [26, 30000, 620, 0]
        ]
      },
      calculations: [
        {
          step: 1,
          title: 'Calculate Initial Entropy',
          formula: 'Entropy(S) = -Σ(pᵢ × log₂(pᵢ))',
          calculation: 'p(approved) = 5/8, p(rejected) = 3/8\nEntropy = -(5/8)×log₂(5/8) - (3/8)×log₂(3/8)',
          result: '0.954',
          explanation: 'High entropy indicates the dataset is mixed with both approved and rejected loans.'
        },
        {
          step: 2,
          title: 'Test Split on Age ≤ 30',
          formula: 'Information Gain = Entropy(S) - Σ(|Sᵥ|/|S| × Entropy(Sᵥ))',
          calculation: 'Left: Age ≤ 30 → [25,28,30,26] → 1 approved, 3 rejected\nRight: Age > 30 → [35,45,52,38] → 4 approved, 0 rejected',
          result: 'Gain = 0.609',
          explanation: 'This split separates the data well, with younger applicants mostly rejected and older ones approved.'
        },
        {
          step: 3,
          title: 'Test Split on Income ≤ 50000',
          formula: 'Information Gain = Entropy(S) - Σ(|Sᵥ|/|S| × Entropy(Sᵥ))',
          calculation: 'Left: Income ≤ 50000 → [35000,40000,45000,30000] → 1 approved, 3 rejected\nRight: Income > 50000 → [55000,75000,85000,60000] → 4 approved, 0 rejected',
          result: 'Gain = 0.609',
          explanation: 'Income split gives the same information gain as age, both are good splitting criteria.'
        },
        {
          step: 4,
          title: 'Choose Best Split (Age ≤ 30)',
          formula: 'Best Split = argmax(Information Gain)',
          calculation: 'Age ≤ 30 selected as root split (could also choose Income)',
          result: 'Root: Age ≤ 30?',
          explanation: 'We choose age as our first split since it has the highest information gain.'
        },
        {
          step: 5,
          title: 'Split Left Subtree (Age ≤ 30)',
          formula: 'Further split on Credit Score ≤ 675',
          calculation: 'Left: Credit ≤ 675 → [650,680,620] → 0 approved, 3 rejected\nRight: Credit > 675 → [700] → 1 approved, 0 rejected',
          result: 'Perfect separation achieved',
          explanation: 'Young applicants with low credit scores are rejected, those with high scores are approved.'
        },
        {
          step: 6,
          title: 'Final Tree Structure',
          formula: 'Complete decision tree with leaf predictions',
          calculation: 'Root: Age ≤ 30?\n├─ Yes: Credit ≤ 675? (Yes→Reject, No→Approve)\n└─ No: Approve',
          result: 'Tree depth: 2, Accuracy: 100%',
          explanation: 'The final tree perfectly classifies all training examples using simple rules about age and credit score.'
        }
      ],
      finalResult: 'The decision tree learned that applicants over 30 are always approved, while younger applicants need a credit score above 675 for approval. This tree achieves 100% accuracy on the training data with simple, interpretable rules.'
    }
  },
  {
    id: 'random-forest',
    name: 'Random Forest',
    category: 'Ensemble Learning',
    description: 'An ensemble method that combines multiple decision trees trained on different bootstrap samples with random feature selection to improve accuracy and reduce overfitting.',
    icon: 'Trees',
    complexity: 'Intermediate',
    useCase: 'Image classification, bioinformatics, stock market analysis, feature importance ranking',
    pros: ['Reduces overfitting compared to single trees', 'Handles missing values well', 'Provides feature importance', 'Works well with default parameters', 'Robust to outliers'],
    cons: ['Less interpretable than single trees', 'Can overfit with very noisy data', 'Memory intensive', 'Slower prediction than single trees'],
    steps: [
      {
        id: 1,
        title: 'Bootstrap Sampling',
        description: 'Create multiple bootstrap samples from the original training dataset by sampling with replacement.',
        animation: 'slideInDown',
        code: 'for i in n_trees: bootstrap_sample[i] = random_sample(data, size=len(data), replace=True)'
      },
      {
        id: 2,
        title: 'Feature Randomization',
        description: 'For each tree, randomly select a subset of features at each split to increase diversity among trees.',
        animation: 'rotateIn',
        code: 'max_features = sqrt(total_features) for classification, total_features/3 for regression'
      },
      {
        id: 3,
        title: 'Build Decision Trees',
        description: 'Train individual decision trees using different bootstrap samples and random feature subsets.',
        animation: 'zoomIn',
        code: 'for i in n_trees: tree[i] = DecisionTree(bootstrap_sample[i], random_features)'
      },
      {
        id: 4,
        title: 'Make Individual Predictions',
        description: 'Each tree in the forest makes predictions independently on new data points.',
        animation: 'slideInLeft',
        code: 'for tree in forest: predictions.append(tree.predict(new_data))'
      },
      {
        id: 5,
        title: 'Aggregate Results',
        description: 'Combine predictions from all trees using majority voting for classification or averaging for regression.',
        animation: 'bounceIn',
        code: 'final_prediction = majority_vote(predictions) or mean(predictions)'
      },
      {
        id: 6,
        title: 'Output Final Prediction',
        description: 'Return the final prediction based on the aggregated results from all trees in the forest.',
        animation: 'fadeInUp',
        code: 'return final_prediction, feature_importance, out_of_bag_score'
      }
    ],
    mathematicalExample: {
      title: 'Email Spam Classification with Random Forest',
      dataset: {
        description: 'Classifying emails as spam or not spam using word frequencies',
        features: ['Word_Money', 'Word_Free', 'Word_Click', 'Spam'],
        data: [
          [5, 3, 2, 1],
          [0, 1, 0, 0],
          [8, 6, 4, 1],
          [1, 0, 1, 0],
          [12, 8, 7, 1],
          [2, 1, 0, 0],
          [6, 4, 3, 1],
          [0, 0, 1, 0]
        ]
      },
      calculations: [
        {
          step: 1,
          title: 'Create Bootstrap Sample 1',
          formula: 'Bootstrap sampling with replacement',
          calculation: 'Sample 1: [5,3,2,1], [8,6,4,1], [5,3,2,1], [12,8,7,1], [6,4,3,1], [0,1,0,0], [2,1,0,0], [0,0,1,0]',
          result: '5 spam, 3 not spam',
          explanation: 'First bootstrap sample has more spam examples due to random sampling with replacement.'
        },
        {
          step: 2,
          title: 'Build Tree 1 with Random Features',
          formula: 'Random feature selection: √3 ≈ 2 features per split',
          calculation: 'Selected features: [Word_Money, Word_Free]\nBest split: Word_Money > 3 → Left: not spam, Right: spam',
          result: 'Tree 1 accuracy: 87.5%',
          explanation: 'Tree 1 uses only 2 features and achieves good performance on its bootstrap sample.'
        },
        {
          step: 3,
          title: 'Create Bootstrap Sample 2',
          formula: 'Different bootstrap sample',
          calculation: 'Sample 2: [0,1,0,0], [1,0,1,0], [8,6,4,1], [2,1,0,0], [12,8,7,1], [0,0,1,0], [6,4,3,1], [5,3,2,1]',
          result: '4 spam, 4 not spam',
          explanation: 'Second bootstrap sample is more balanced between spam and not spam.'
        },
        {
          step: 4,
          title: 'Build Tree 2 with Different Features',
          formula: 'Random feature selection: [Word_Free, Word_Click]',
          calculation: 'Selected features: [Word_Free, Word_Click]\nBest split: Word_Free > 2 → Left: not spam, Right: spam',
          result: 'Tree 2 accuracy: 75%',
          explanation: 'Tree 2 uses different features and learns a different decision boundary.'
        },
        {
          step: 5,
          title: 'Combine Predictions (Voting)',
          formula: 'Majority voting across all trees',
          calculation: 'Test email: [4, 2, 1]\nTree 1 prediction: Spam (Word_Money=4 > 3)\nTree 2 prediction: Not Spam (Word_Free=2 ≤ 2)\nTree 3 prediction: Spam',
          result: 'Final: Spam (2/3 votes)',
          explanation: 'Random Forest combines individual tree predictions through majority voting.'
        },
        {
          step: 6,
          title: 'Calculate Feature Importance',
          formula: 'Average importance across all trees',
          calculation: 'Word_Money: 0.45, Word_Free: 0.35, Word_Click: 0.20',
          result: 'Most important: Word_Money',
          explanation: 'Random Forest provides feature importance by averaging the importance scores from all trees.'
        }
      ],
      finalResult: 'The Random Forest with 100 trees achieves 94% accuracy by combining diverse decision trees. Each tree sees different data and features, making the ensemble more robust than any single tree. The model identifies "Word_Money" as the most important feature for spam detection.'
    }
  },
  {
    id: 'kmeans',
    name: 'K-Means Clustering',
    category: 'Unsupervised Learning',
    description: 'Groups data into k clusters by iteratively minimizing the distance between points and their assigned cluster centers (centroids).',
    icon: 'Circle',
    complexity: 'Beginner',
    useCase: 'Customer segmentation, image segmentation, market research, data compression',
    pros: ['Simple and fast algorithm', 'Works well with spherical clusters', 'Scalable to large datasets', 'Guaranteed convergence', 'Easy to implement'],
    cons: ['Requires predefined number of clusters (k)', 'Sensitive to initialization', 'Assumes spherical clusters', 'Sensitive to outliers', 'Struggles with varying cluster sizes'],
    steps: [
      {
        id: 1,
        title: 'Choose Number of Clusters (k)',
        description: 'Decide on the number of clusters (k) you want to create. This can be determined using methods like the elbow method or silhouette analysis.',
        animation: 'fadeInDown',
        code: 'k = 3  # or use elbow_method(data) to find optimal k'
      },
      {
        id: 2,
        title: 'Initialize Centroids',
        description: 'Randomly place k centroids in the feature space or use smart initialization like K-means++.',
        animation: 'zoomIn',
        code: 'centroids = random_initialize(k, data_bounds) or kmeans_plus_plus(data, k)'
      },
      {
        id: 3,
        title: 'Assign Points to Clusters',
        description: 'Assign each data point to the nearest centroid based on Euclidean distance.',
        animation: 'slideInLeft',
        code: 'for point in data: cluster[point] = argmin(distance(point, centroid))'
      },
      {
        id: 4,
        title: 'Update Centroids',
        description: 'Move each centroid to the center (mean) of all points assigned to its cluster.',
        animation: 'bounceIn',
        code: 'for i in k: centroids[i] = mean(points_in_cluster[i])'
      },
      {
        id: 5,
        title: 'Check for Convergence',
        description: 'Check if centroids have stopped moving significantly or maximum iterations have been reached.',
        animation: 'rotateIn',
        code: 'if sum(distance(old_centroids, new_centroids)) < tolerance: break'
      },
      {
        id: 6,
        title: 'Output Final Clusters',
        description: 'Return the final cluster assignments and centroid positions.',
        animation: 'fadeInUp',
        code: 'return cluster_assignments, final_centroids, inertia'
      }
    ],
    mathematicalExample: {
      title: 'Customer Segmentation Example',
      dataset: {
        description: 'Segmenting customers based on annual spending and age',
        features: ['Age', 'Annual Spending ($)'],
        data: [
          [25, 15000],
          [30, 18000],
          [35, 22000],
          [45, 45000],
          [50, 50000],
          [55, 48000],
          [65, 25000],
          [70, 20000]
        ]
      },
      calculations: [
        {
          step: 1,
          title: 'Initialize 3 Centroids Randomly',
          formula: 'C₁ = (x₁, y₁), C₂ = (x₂, y₂), C₃ = (x₃, y₃)',
          calculation: 'C₁ = (30, 20000), C₂ = (50, 40000), C₃ = (60, 30000)',
          result: 'Initial centroids placed',
          explanation: 'We start with 3 random centroids in the age-spending space.'
        },
        {
          step: 2,
          title: 'Calculate Distances (Iteration 1)',
          formula: 'distance = √[(x₁-x₂)² + (y₁-y₂)²]',
          calculation: 'Point (25, 15000):\nd₁ = √[(25-30)² + (15000-20000)²] = 5000.0\nd₂ = √[(25-50)² + (15000-40000)²] = 25000.6\nd₃ = √[(25-60)² + (15000-30000)²] = 18027.8',
          result: 'Assign to Cluster 1 (closest)',
          explanation: 'Each point is assigned to the nearest centroid based on Euclidean distance.'
        },
        {
          step: 3,
          title: 'Assign All Points to Clusters',
          formula: 'cluster[i] = argmin(distance(point[i], centroid[j]))',
          calculation: 'Cluster 1: [(25,15000), (30,18000), (35,22000)]\nCluster 2: [(45,45000), (50,50000), (55,48000)]\nCluster 3: [(65,25000), (70,20000)]',
          result: '3 clusters formed',
          explanation: 'Points are grouped based on proximity to centroids, forming natural customer segments.'
        },
        {
          step: 4,
          title: 'Update Centroids (Iteration 1)',
          formula: 'new_centroid = (mean(x_values), mean(y_values))',
          calculation: 'C₁ = ((25+30+35)/3, (15000+18000+22000)/3) = (30, 18333)\nC₂ = ((45+50+55)/3, (45000+50000+48000)/3) = (50, 47667)\nC₃ = ((65+70)/2, (25000+20000)/2) = (67.5, 22500)',
          result: 'Centroids moved to cluster centers',
          explanation: 'New centroids are calculated as the mean position of all points in each cluster.'
        },
        {
          step: 5,
          title: 'Check Convergence',
          formula: 'convergence = Σ|new_centroid - old_centroid| < tolerance',
          calculation: 'Centroid movement:\nC₁: √[(30-30)² + (18333-20000)²] = 1667\nC₂: √[(50-50)² + (47667-40000)²] = 7667\nC₃: √[(67.5-60)² + (22500-30000)²] = 7500.4',
          result: 'Not converged, continue',
          explanation: 'Centroids moved significantly, so we continue with another iteration.'
        },
        {
          step: 6,
          title: 'Final Clusters (After Convergence)',
          formula: 'Final cluster assignments after 3 iterations',
          calculation: 'Young Spenders: [(25,15000), (30,18000), (35,22000)] - Centroid: (30, 18333)\nHigh Spenders: [(45,45000), (50,50000), (55,48000)] - Centroid: (50, 47667)\nSenior Savers: [(65,25000), (70,20000)] - Centroid: (67.5, 22500)',
          result: '3 distinct customer segments',
          explanation: 'K-means identified three customer segments: young low spenders, middle-aged high spenders, and senior moderate spenders.'
        }
      ],
      finalResult: 'K-means successfully segmented customers into 3 groups: Young Spenders (avg age 30, spending $18K), High Spenders (avg age 50, spending $48K), and Senior Savers (avg age 68, spending $23K). This segmentation can help businesses tailor marketing strategies for each group.'
    }
  },
  {
    id: 'neural-networks',
    name: 'Neural Networks',
    category: 'Deep Learning',
    description: 'Networks of interconnected nodes (neurons) organized in layers that learn complex patterns through forward propagation and backpropagation.',
    icon: 'Brain',
    complexity: 'Advanced',
    useCase: 'Image recognition, natural language processing, speech recognition, game playing',
    pros: ['Can learn complex non-linear patterns', 'Versatile for many problem types', 'State-of-the-art performance in many domains', 'Automatic feature learning', 'Scalable with more data'],
    cons: ['Requires large amounts of data', 'Computationally expensive', 'Black box (difficult to interpret)', 'Many hyperparameters to tune', 'Prone to overfitting'],
    steps: [
      {
        id: 1,
        title: 'Define Network Architecture',
        description: 'Design the network structure: input layer size, number of hidden layers, neurons per layer, and output layer size.',
        animation: 'slideInDown',
        code: 'network = [input_size, hidden1_size, hidden2_size, output_size]'
      },
      {
        id: 2,
        title: 'Initialize Weights and Biases',
        description: 'Randomly initialize weights and biases for all connections between neurons using techniques like Xavier or He initialization.',
        animation: 'zoomIn',
        code: 'W = random_normal(0, sqrt(2/n_inputs)), b = zeros(n_neurons)'
      },
      {
        id: 3,
        title: 'Forward Propagation',
        description: 'Pass input data through the network, calculating weighted sums and applying activation functions at each layer.',
        animation: 'slideInRight',
        code: 'for layer in network: z = W*a + b, a = activation_function(z)'
      },
      {
        id: 4,
        title: 'Calculate Loss',
        description: 'Compare predicted outputs with actual targets using a loss function (MSE for regression, cross-entropy for classification).',
        animation: 'bounceIn',
        code: 'loss = cross_entropy(predictions, targets) or mse(predictions, targets)'
      },
      {
        id: 5,
        title: 'Backpropagation',
        description: 'Calculate gradients by propagating errors backward through the network using the chain rule.',
        animation: 'slideInLeft',
        code: 'for layer in reverse(network): δ = δ_next * W.T * activation_derivative(z)'
      },
      {
        id: 6,
        title: 'Update Weights and Biases',
        description: 'Adjust weights and biases using gradient descent or advanced optimizers like Adam to minimize the loss.',
        animation: 'fadeInUp',
        code: 'W = W - learning_rate * ∇W, b = b - learning_rate * ∇b'
      }
    ],
    mathematicalExample: {
      title: 'XOR Problem with Neural Network',
      dataset: {
        description: 'Learning the XOR function (exclusive OR) which is not linearly separable',
        features: ['Input1', 'Input2', 'XOR Output'],
        data: [
          [0, 0, 0],
          [0, 1, 1],
          [1, 0, 1],
          [1, 1, 0]
        ]
      },
      calculations: [
        {
          step: 1,
          title: 'Network Architecture',
          formula: 'Input Layer: 2 neurons, Hidden Layer: 2 neurons, Output Layer: 1 neuron',
          calculation: 'Network: [2, 2, 1]\nActivation: Sigmoid function σ(x) = 1/(1 + e^(-x))',
          result: '2-2-1 architecture',
          explanation: 'We need at least one hidden layer to solve the XOR problem since it\'s not linearly separable.'
        },
        {
          step: 2,
          title: 'Initialize Weights',
          formula: 'W₁ = [[w₁₁, w₁₂], [w₂₁, w₂₂]], W₂ = [[w₃₁], [w₃₂]]',
          calculation: 'W₁ = [[0.5, -0.3], [0.2, 0.8]], b₁ = [0.1, -0.2]\nW₂ = [[0.9], [-0.7]], b₂ = [0.3]',
          result: 'Random initialization complete',
          explanation: 'Weights are initialized randomly to break symmetry and allow the network to learn.'
        },
        {
          step: 3,
          title: 'Forward Pass for Input [1, 0]',
          formula: 'z = W·a + b, a = σ(z)',
          calculation: 'Hidden layer:\nz₁ = [0.5×1 + (-0.3)×0] + 0.1 = 0.6, a₁ = σ(0.6) = 0.646\nz₂ = [0.2×1 + 0.8×0] + (-0.2) = 0.0, a₂ = σ(0.0) = 0.5\n\nOutput layer:\nz₃ = [0.9×0.646 + (-0.7)×0.5] + 0.3 = 0.581 + 0.3 = 0.881\noutput = σ(0.881) = 0.707',
          result: 'Predicted: 0.707, Target: 1',
          explanation: 'The network\'s initial prediction is 0.707, but the target for XOR(1,0) is 1.'
        },
        {
          step: 4,
          title: 'Calculate Loss',
          formula: 'Loss = ½(target - prediction)²',
          calculation: 'Loss = ½(1 - 0.707)² = ½(0.293)² = 0.043',
          result: 'Loss = 0.043',
          explanation: 'Mean squared error measures how far our prediction is from the target.'
        },
        {
          step: 5,
          title: 'Backpropagation',
          formula: 'δ = (target - output) × σ\'(z), ∇W = δ × a^(l-1)',
          calculation: 'Output layer error:\nδ₃ = (1 - 0.707) × 0.707 × (1 - 0.707) = 0.293 × 0.207 = 0.061\n\nHidden layer errors:\nδ₁ = δ₃ × w₃₁ × σ\'(z₁) = 0.061 × 0.9 × 0.229 = 0.013\nδ₂ = δ₃ × w₃₂ × σ\'(z₂) = 0.061 × (-0.7) × 0.25 = -0.011',
          result: 'Gradients calculated',
          explanation: 'Backpropagation calculates how much each weight contributed to the error.'
        },
        {
          step: 6,
          title: 'Update Weights',
          formula: 'W_new = W_old - α × ∇W',
          calculation: 'Learning rate α = 0.5\n\nOutput weights:\nw₃₁ = 0.9 - 0.5 × (0.061 × 0.646) = 0.9 - 0.020 = 0.880\nw₃₂ = -0.7 - 0.5 × (0.061 × 0.5) = -0.7 - 0.015 = -0.715\n\nHidden weights updated similarly...',
          result: 'Weights updated',
          explanation: 'After many iterations, the network learns to correctly output XOR values for all inputs.'
        }
      ],
      finalResult: 'After 10,000 training iterations, the neural network successfully learns the XOR function with 99.9% accuracy. The hidden layer learns to create a non-linear decision boundary that separates the XOR classes, demonstrating the power of neural networks to solve non-linearly separable problems.'
    }
  },
  {
    id: 'svm',
    name: 'Support Vector Machine',
    category: 'Supervised Learning',
    description: 'Finds the optimal hyperplane that separates classes with maximum margin by identifying support vectors and using kernel tricks for non-linear data.',
    icon: 'Separator',
    complexity: 'Advanced',
    useCase: 'Text classification, image classification, bioinformatics, high-dimensional data',
    pros: ['Effective in high-dimensional spaces', 'Memory efficient (uses support vectors only)', 'Versatile with different kernel functions', 'Works well with small datasets', 'Strong theoretical foundation'],
    cons: ['Poor performance on large datasets', 'Sensitive to feature scaling', 'No probabilistic output', 'Choice of kernel and parameters is crucial', 'Training time scales poorly'],
    steps: [
      {
        id: 1,
        title: 'Data Preparation and Scaling',
        description: 'Prepare and scale your feature data for optimal SVM performance. Feature scaling is crucial for SVM.',
        animation: 'fadeInDown',
        code: 'X_scaled = StandardScaler().fit_transform(X)'
      },
      {
        id: 2,
        title: 'Choose Kernel Function',
        description: 'Select appropriate kernel function (linear, polynomial, RBF, sigmoid) based on data complexity and dimensionality.',
        animation: 'slideInLeft',
        code: 'kernel = "rbf" or "linear" or "poly", C = regularization_parameter'
      },
      {
        id: 3,
        title: 'Identify Support Vectors',
        description: 'Find data points closest to the decision boundary that will determine the optimal hyperplane.',
        animation: 'zoomIn',
        code: 'support_vectors = points where 0 < α_i < C (on margin boundary)'
      },
      {
        id: 4,
        title: 'Optimize Hyperplane',
        description: 'Find the hyperplane that maximizes the margin between classes using quadratic programming or SMO algorithm.',
        animation: 'rotateIn',
        code: 'maximize: Σα_i - 0.5*ΣΣα_i*α_j*y_i*y_j*K(x_i,x_j) subject to constraints'
      },
      {
        id: 5,
        title: 'Apply Kernel Trick',
        description: 'Use kernel functions to handle non-linearly separable data by mapping to higher-dimensional space.',
        animation: 'bounceIn',
        code: 'K(x_i, x_j) = φ(x_i)·φ(x_j) where φ maps to higher dimension'
      },
      {
        id: 6,
        title: 'Make Predictions',
        description: 'Classify new data points based on their position relative to the decision hyperplane.',
        animation: 'fadeInUp',
        code: 'prediction = sign(Σα_i*y_i*K(x_i, x_new) + b)'
      }
    ],
    mathematicalExample: {
      title: 'Text Classification with SVM',
      dataset: {
        description: 'Classifying emails as spam or not spam using word frequencies',
        features: ['Word_Frequency_1', 'Word_Frequency_2', 'Class'],
        data: [
          [1, 1, -1],
          [2, 2, -1],
          [2, 0, -1],
          [0, 0, -1],
          [4, 4, 1],
          [4, 0, 1],
          [0, 4, 1],
          [5, 5, 1]
        ]
      },
      calculations: [
        {
          step: 1,
          title: 'Scale Features',
          formula: 'X_scaled = (X - mean) / std',
          calculation: 'Original data range: [0, 5]\nMean: [2.25, 2.0], Std: [1.83, 1.93]\nScaled data range: approximately [-1.2, 1.5]',
          result: 'Features normalized',
          explanation: 'Feature scaling ensures all dimensions contribute equally to the distance calculations.'
        },
        {
          step: 2,
          title: 'Choose Linear Kernel',
          formula: 'K(x_i, x_j) = x_i · x_j (dot product)',
          calculation: 'Linear kernel selected for this linearly separable problem\nRegularization parameter C = 1.0',
          result: 'Linear SVM configured',
          explanation: 'Linear kernel is appropriate when classes can be separated by a straight line/hyperplane.'
        },
        {
          step: 3,
          title: 'Solve Optimization Problem',
          formula: 'Minimize: ½||w||² + C∑ξᵢ subject to yᵢ(w·xᵢ + b) ≥ 1 - ξᵢ',
          calculation: 'Dual formulation:\nMaximize: ∑αᵢ - ½∑∑αᵢαⱼyᵢyⱼ(xᵢ·xⱼ)\nSubject to: ∑αᵢyᵢ = 0, 0 ≤ αᵢ ≤ C',
          result: 'Optimal α values found',
          explanation: 'The optimization finds the hyperplane that maximizes the margin between classes.'
        },
        {
          step: 4,
          title: 'Identify Support Vectors',
          formula: 'Support vectors: points where αᵢ > 0',
          calculation: 'Support vectors found:\nSV1: (2, 2, -1) with α₁ = 0.5\nSV2: (4, 0, +1) with α₂ = 0.3\nSV3: (0, 4, +1) with α₃ = 0.2',
          result: '3 support vectors identified',
          explanation: 'Support vectors are the critical points that define the decision boundary.'
        },
        {
          step: 5,
          title: 'Calculate Decision Boundary',
          formula: 'w = ∑αᵢyᵢxᵢ, b = yₖ - w·xₖ for any support vector k',
          calculation: 'w = 0.5×(-1)×[2,2] + 0.3×(+1)×[4,0] + 0.2×(+1)×[0,4]\nw = [-1,-1] + [1.2,0] + [0,0.8] = [0.2, -0.2]\nb = -1 - [0.2,-0.2]·[2,2] = -1 - (0.4-0.4) = -1',
          result: 'Decision boundary: 0.2x₁ - 0.2x₂ - 1 = 0',
          explanation: 'The hyperplane equation separates spam from non-spam emails.'
        },
        {
          step: 6,
          title: 'Make Prediction',
          formula: 'f(x) = sign(w·x + b)',
          calculation: 'New email with features [3, 1]:\nf([3,1]) = sign([0.2,-0.2]·[3,1] - 1)\n= sign(0.6 - 0.2 - 1) = sign(-0.6) = -1',
          result: 'Prediction: Not Spam',
          explanation: 'The new email is classified as not spam since it falls on the negative side of the hyperplane.'
        }
      ],
      finalResult: 'The SVM successfully learned a decision boundary that separates spam from non-spam emails with 100% accuracy on the training data. The model identified 3 support vectors that define the optimal hyperplane with maximum margin. For new emails, the model can classify them based on their position relative to this learned boundary.'
    }
  }
];