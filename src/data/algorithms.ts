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
          [2000, 300000],
          [2200, 330000],
          [2500, 375000],
          [2800, 420000]
        ]
      },
      calculations: [
        {
          step: 1,
          title: 'Calculate Mean Values',
          formula: 'x̄ = (1/n) × Σxᵢ, ȳ = (1/n) × Σyᵢ',
          calculation: 'x̄ = (1000+1200+1500+1800+2000+2200+2500+2800)/8 = 1875\nȳ = (150000+180000+225000+270000+300000+330000+375000+420000)/8 = 281250',
          result: 'x̄ = 1875, ȳ = 281250',
          explanation: 'We calculate the mean of both features and target values as starting points for our calculations.'
        },
        {
          step: 2,
          title: 'Calculate Slope (θ₁)',
          formula: 'θ₁ = Σ((xᵢ - x̄)(yᵢ - ȳ)) / Σ((xᵢ - x̄)²)',
          calculation: 'Numerator: (-875×-131250) + (-675×-101250) + ... + (925×138750) = 1,687,500,000\nDenominator: (-875)² + (-675)² + ... + (925)² = 3,750,000\nθ₁ = 1,687,500,000 / 3,750,000 = 450',
          result: 'θ₁ = 450',
          explanation: 'The slope tells us that for every additional square foot, the house price increases by $450.'
        },
        {
          step: 3,
          title: 'Calculate Intercept (θ₀)',
          formula: 'θ₀ = ȳ - θ₁ × x̄',
          calculation: 'θ₀ = 281250 - 450 × 1875 = 281250 - 843750 = -562500',
          result: 'θ₀ = -562500',
          explanation: 'The intercept represents the base price when size is zero (theoretical baseline).'
        },
        {
          step: 4,
          title: 'Final Linear Equation',
          formula: 'ŷ = θ₀ + θ₁ × x',
          calculation: 'ŷ = -562500 + 450 × x',
          result: 'Price = -562500 + 450 × Size',
          explanation: 'This is our final linear regression equation for predicting house prices.'
        },
        {
          step: 5,
          title: 'Calculate R² (Coefficient of Determination)',
          formula: 'R² = 1 - (SSres / SStot)',
          calculation: 'SSres = Σ(yᵢ - ŷᵢ)² = 562,500,000\nSStot = Σ(yᵢ - ȳ)² = 11,250,000,000\nR² = 1 - (562,500,000 / 11,250,000,000) = 0.95',
          result: 'R² = 0.95',
          explanation: 'Our model explains 95% of the variance in house prices, indicating an excellent fit.'
        }
      ],
      finalResult: 'The linear regression model achieved R² = 0.95, meaning it explains 95% of the price variation. The equation Price = -562,500 + 450 × Size shows that each square foot adds $450 to the house value.',
      prediction: {
        newCase: [2300],
        result: 472500,
        explanation: 'For a 2,300 sq ft house: Price = -562,500 + 450 × 2,300 = $472,500'
      }
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
          calculation: 'Total samples: 8\nApproved: 5, Rejected: 3\np(approved) = 5/8 = 0.625, p(rejected) = 3/8 = 0.375\nEntropy = -(0.625×log₂(0.625)) - (0.375×log₂(0.375))\nEntropy = -(0.625×(-0.678)) - (0.375×(-1.415)) = 0.424 + 0.531',
          result: '0.954',
          explanation: 'High entropy indicates the dataset is mixed with both approved and rejected loans.'
        },
        {
          step: 2,
          title: 'Test Split on Age ≤ 30',
          formula: 'Information Gain = Entropy(S) - Σ(|Sᵥ|/|S| × Entropy(Sᵥ))',
          calculation: 'Left (Age ≤ 30): [25,28,30,26] → 1 approved, 3 rejected\nEntropy_left = -(1/4×log₂(1/4)) - (3/4×log₂(3/4)) = 0.811\nRight (Age > 30): [35,45,52,38] → 4 approved, 0 rejected\nEntropy_right = 0 (pure)\nWeighted entropy = (4/8×0.811) + (4/8×0) = 0.406\nGain = 0.954 - 0.406',
          result: '0.548',
          explanation: 'This split provides good separation between approved and rejected applications.'
        },
        {
          step: 3,
          title: 'Test Split on Income ≤ 50000',
          formula: 'Information Gain = Entropy(S) - Σ(|Sᵥ|/|S| × Entropy(Sᵥ))',
          calculation: 'Left (Income ≤ 50000): [35000,40000,45000,30000] → 1 approved, 3 rejected\nEntropy_left = 0.811\nRight (Income > 50000): [55000,75000,85000,60000] → 4 approved, 0 rejected\nEntropy_right = 0\nWeighted entropy = (4/8×0.811) + (4/8×0) = 0.406\nGain = 0.954 - 0.406',
          result: '0.548',
          explanation: 'Income split gives the same information gain as age, both are equally good.'
        },
        {
          step: 4,
          title: 'Choose Best Split (Age ≤ 30)',
          formula: 'Best Split = argmax(Information Gain)',
          calculation: 'Age ≤ 30: Gain = 0.548\nIncome ≤ 50000: Gain = 0.548\nCredit ≤ 700: Gain = 0.311\nChoose Age ≤ 30 (first encountered with max gain)',
          result: 'Root: Age ≤ 30?',
          explanation: 'We choose age as our first split criterion.'
        },
        {
          step: 5,
          title: 'Split Left Subtree (Age ≤ 30)',
          formula: 'Further split on Credit Score ≤ 675',
          calculation: 'Left subtree data: [25,650,0], [28,680,0], [30,700,1], [26,620,0]\nSplit on Credit ≤ 675:\nLeft: [25,650,0], [28,680,0], [26,620,0] → 0 approved, 3 rejected (pure)\nRight: [30,700,1] → 1 approved, 0 rejected (pure)\nGain = 0.811 - 0 = 0.811 (perfect split)',
          result: 'Perfect separation achieved',
          explanation: 'Young applicants with low credit scores are rejected, those with high scores are approved.'
        }
      ],
      finalResult: 'The decision tree learned that applicants over 30 are always approved, while younger applicants need a credit score above 675 for approval. This tree achieves 100% accuracy on the training data.',
      prediction: {
        newCase: [32, 50000, 720],
        result: 'Approved',
        explanation: 'Age = 32 > 30, so following the right branch → Approved'
      }
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
          calculation: 'C₁ = (30, 20000) - Young Low Spenders\nC₂ = (50, 40000) - Middle High Spenders\nC₃ = (60, 30000) - Senior Moderate Spenders',
          result: 'Initial centroids placed',
          explanation: 'We start with 3 random centroids in the age-spending space.'
        },
        {
          step: 2,
          title: 'Calculate Distances (Iteration 1)',
          formula: 'distance = √[(x₁-x₂)² + (y₁-y₂)²]',
          calculation: 'Point (25, 15000):\nd₁ = √[(25-30)² + (15000-20000)²] = √[25 + 25000000] = 5000.0\nd₂ = √[(25-50)² + (15000-40000)²] = √[625 + 625000000] = 25000.6\nd₃ = √[(25-60)² + (15000-30000)²] = √[1225 + 225000000] = 15000.04',
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
          calculation: 'Centroid movement:\nC₁: √[(30-30)² + (18333-20000)²] = 1667\nC₂: √[(50-50)² + (47667-40000)²] = 7667\nC₃: √[(67.5-60)² + (22500-30000)²] = 7500.4\nTotal movement = 16834.4 > tolerance (100)',
          result: 'Not converged, continue',
          explanation: 'Centroids moved significantly, so we continue with another iteration.'
        }
      ],
      finalResult: 'K-means successfully segmented customers into 3 groups: Young Spenders (avg age 30, spending $18K), High Spenders (avg age 50, spending $48K), and Senior Savers (avg age 68, spending $23K). This segmentation can help businesses tailor marketing strategies for each group.',
      prediction: {
        newCase: [40, 35000],
        result: 'Cluster 2 (High Spenders)',
        explanation: 'Customer aged 40 with $35K spending is closest to Cluster 2 centroid (50, 47667)'
      }
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
      title: 'Email Spam Classification',
      dataset: {
        description: 'Classifying emails as spam (1) or not spam (-1) using word frequencies',
        features: ['Word_Money', 'Word_Free', 'Class'],
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
          calculation: 'Original data range: [0, 5]\nMean: [2.25, 2.0], Std: [1.83, 1.93]\nScaled features:\n[1,1] → [-0.68, -0.52]\n[2,2] → [-0.14, 0.00]\n[4,4] → [0.96, 1.04]\n[5,5] → [1.50, 1.56]',
          result: 'Features normalized',
          explanation: 'Feature scaling ensures all dimensions contribute equally to the distance calculations.'
        },
        {
          step: 2,
          title: 'Choose Linear Kernel',
          formula: 'K(x_i, x_j) = x_i · x_j (dot product)',
          calculation: 'Linear kernel selected for this linearly separable problem\nRegularization parameter C = 1.0\nKernel matrix computed for all training pairs',
          result: 'Linear SVM configured',
          explanation: 'Linear kernel is appropriate when classes can be separated by a straight line/hyperplane.'
        },
        {
          step: 3,
          title: 'Solve Optimization Problem',
          formula: 'Minimize: ½||w||² + C∑ξᵢ subject to yᵢ(w·xᵢ + b) ≥ 1 - ξᵢ',
          calculation: 'Dual formulation:\nMaximize: ∑αᵢ - ½∑∑αᵢαⱼyᵢyⱼ(xᵢ·xⱼ)\nSubject to: ∑αᵢyᵢ = 0, 0 ≤ αᵢ ≤ C\nSolved using SMO algorithm',
          result: 'Optimal α values found',
          explanation: 'The optimization finds the hyperplane that maximizes the margin between classes.'
        },
        {
          step: 4,
          title: 'Identify Support Vectors',
          formula: 'Support vectors: points where αᵢ > 0',
          calculation: 'Support vectors found:\nSV1: [2, 2, -1] with α₁ = 0.5\nSV2: [4, 0, +1] with α₂ = 0.3\nSV3: [0, 4, +1] with α₃ = 0.2\nThese points lie on the margin boundary',
          result: '3 support vectors identified',
          explanation: 'Support vectors are the critical points that define the decision boundary.'
        },
        {
          step: 5,
          title: 'Calculate Decision Boundary',
          formula: 'w = ∑αᵢyᵢxᵢ, b = yₖ - w·xₖ for any support vector k',
          calculation: 'w = 0.5×(-1)×[2,2] + 0.3×(+1)×[4,0] + 0.2×(+1)×[0,4]\nw = [-1,-1] + [1.2,0] + [0,0.8] = [0.2, -0.2]\nUsing SV1: b = -1 - [0.2,-0.2]·[2,2] = -1 - (0.4-0.4) = -1',
          result: 'Decision boundary: 0.2x₁ - 0.2x₂ - 1 = 0',
          explanation: 'The hyperplane equation separates spam from non-spam emails.'
        }
      ],
      finalResult: 'The SVM successfully learned a decision boundary that separates spam from non-spam emails with 100% accuracy on the training data. The model identified 3 support vectors that define the optimal hyperplane with maximum margin.',
      prediction: {
        newCase: [3, 1],
        result: 'Not Spam (-1)',
        explanation: 'f([3,1]) = sign(0.2×3 - 0.2×1 - 1) = sign(-0.6) = -1 (Not Spam)'
      }
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
      title: 'Medical Diagnosis Classification',
      dataset: {
        description: 'Diagnosing disease based on symptoms (1=present, 0=absent)',
        features: ['Fever', 'Cough', 'Fatigue', 'Disease'],
        data: [
          [1, 1, 1, 1],
          [1, 1, 0, 1],
          [1, 0, 1, 1],
          [0, 1, 1, 0],
          [0, 0, 1, 0],
          [0, 0, 0, 0],
          [1, 0, 0, 1],
          [0, 1, 0, 0]
        ]
      },
      calculations: [
        {
          step: 1,
          title: 'Create Bootstrap Sample 1',
          formula: 'Bootstrap sampling with replacement',
          calculation: 'Sample 1 (indices): [0, 2, 4, 6, 1, 3, 7, 5]\nData: [[1,1,1,1], [1,0,1,1], [0,0,1,0], [1,0,0,1], [1,1,0,1], [0,1,1,0], [0,1,0,0], [0,0,0,0]]\nDisease count: 4 positive, 4 negative',
          result: 'Balanced bootstrap sample',
          explanation: 'First bootstrap sample created with replacement, maintaining class distribution.'
        },
        {
          step: 2,
          title: 'Build Tree 1 with Random Features',
          formula: 'Random feature selection: √3 ≈ 2 features per split',
          calculation: 'Available features: [Fever, Cough, Fatigue]\nSelected for root split: [Fever, Cough]\nBest split: Fever = 1\nLeft (Fever=0): 3 samples → 0 disease\nRight (Fever=1): 5 samples → 4 disease\nTree 1 rule: IF Fever=1 THEN Disease=1 ELSE Disease=0',
          result: 'Tree 1 accuracy: 87.5%',
          explanation: 'Tree 1 uses fever as primary indicator, achieving good but not perfect accuracy.'
        },
        {
          step: 3,
          title: 'Create Bootstrap Sample 2',
          formula: 'Different bootstrap sample',
          calculation: 'Sample 2 (indices): [1, 3, 5, 7, 0, 2, 4, 6]\nData: [[1,1,0,1], [0,1,1,0], [0,0,0,0], [0,1,0,0], [1,1,1,1], [1,0,1,1], [0,0,1,0], [1,0,0,1]]\nDisease count: 4 positive, 4 negative',
          result: 'Different sample distribution',
          explanation: 'Second bootstrap sample has different data points, leading to different tree structure.'
        },
        {
          step: 4,
          title: 'Build Tree 2 with Different Features',
          formula: 'Random feature selection: [Cough, Fatigue]',
          calculation: 'Selected features: [Cough, Fatigue]\nBest split: Cough = 1\nLeft (Cough=0): 4 samples → 2 disease\nRight (Cough=1): 4 samples → 2 disease\nFurther split on Fatigue needed\nTree 2 rule: IF Cough=1 AND Fatigue=1 THEN Disease=1',
          result: 'Tree 2 accuracy: 75%',
          explanation: 'Tree 2 uses different features and learns different patterns in the data.'
        },
        {
          step: 5,
          title: 'Combine Predictions (Voting)',
          formula: 'Majority voting across all trees',
          calculation: 'Test case: [Fever=1, Cough=1, Fatigue=0]\nTree 1 prediction: Disease=1 (Fever=1)\nTree 2 prediction: Disease=0 (Cough=1 but Fatigue=0)\nTree 3 prediction: Disease=1 (majority pattern)\nVoting: 2 votes for Disease=1, 1 vote for Disease=0',
          result: 'Final: Disease=1',
          explanation: 'Random Forest combines individual tree predictions through majority voting.'
        }
      ],
      finalResult: 'The Random Forest with 100 trees achieves 92% accuracy by combining diverse decision trees. Each tree sees different data and features, making the ensemble more robust than any single tree. The model identifies fever and cough combination as the strongest disease indicator.',
      prediction: {
        newCase: [1, 0, 1],
        result: 'Disease=1',
        explanation: 'Patient with fever and fatigue: 85% of trees predict disease presence'
      }
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
          [1, 1, 0],
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
          calculation: 'Network: [2, 2, 1]\nActivation: Sigmoid function σ(x) = 1/(1 + e^(-x))\nTotal parameters: (2×2 + 2) + (2×1 + 1) = 9 parameters',
          result: '2-2-1 architecture',
          explanation: 'We need at least one hidden layer to solve the XOR problem since it\'s not linearly separable.'
        },
        {
          step: 2,
          title: 'Initialize Weights',
          formula: 'W₁ = [[w₁₁, w₁₂], [w₂₁, w₂₂]], W₂ = [[w₃₁], [w₃₂]]',
          calculation: 'W₁ = [[0.5, -0.3], [0.2, 0.8]], b₁ = [0.1, -0.2]\nW₂ = [[0.9], [-0.7]], b₂ = [0.3]\nTotal 9 parameters initialized randomly',
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
          calculation: 'Loss = ½(1 - 0.707)² = ½(0.293)² = ½(0.086) = 0.043\nThis represents the error for this single training example',
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
        }
      ],
      finalResult: 'After 10,000 training iterations, the neural network successfully learns the XOR function with 99.9% accuracy. The hidden layer learns to create a non-linear decision boundary that separates the XOR classes, demonstrating the power of neural networks to solve non-linearly separable problems.',
      prediction: {
        newCase: [1, 1],
        result: 0.02,
        explanation: 'XOR(1,1) = 0: Network outputs 0.02 ≈ 0 (correct)'
      }
    }
  }
];