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
      title: 'Student Performance Prediction',
      dataset: {
        description: 'Predicting final exam scores based on study hours, attendance, previous scores, and sleep hours',
        features: ['Study Hours', 'Attendance %', 'Previous Score', 'Sleep Hours', 'Final Score'],
        data: [
          [8, 95, 85, 7, 92],
          [6, 80, 78, 6, 84],
          [10, 98, 90, 8, 96],
          [4, 70, 65, 5, 72],
          [7, 85, 82, 7, 88],
          [9, 92, 88, 8, 94],
          [5, 75, 70, 6, 76],
          [3, 60, 55, 4, 65]
        ]
      },
      calculations: [
        {
          step: 1,
          title: 'Calculate Mean Values',
          formula: 'x̄ = (1/n) × Σxᵢ, ȳ = (1/n) × Σyᵢ',
          calculation: 'Study Hours: x̄₁ = (8+6+10+4+7+9+5+3)/8 = 6.5\nAttendance: x̄₂ = (95+80+98+70+85+92+75+60)/8 = 81.875\nPrevious Score: x̄₃ = (85+78+90+65+82+88+70+55)/8 = 76.625\nSleep Hours: x̄₄ = (7+6+8+5+7+8+6+4)/8 = 6.375\nFinal Score: ȳ = (92+84+96+72+88+94+76+65)/8 = 83.375',
          result: 'Means calculated for all features',
          explanation: 'We calculate the mean of all features and target values as starting points for our linear regression calculations.'
        },
        {
          step: 2,
          title: 'Calculate Correlation Matrix',
          formula: 'r = Σ((xᵢ - x̄)(yᵢ - ȳ)) / √(Σ(xᵢ - x̄)² × Σ(yᵢ - ȳ)²)',
          calculation: 'Study Hours vs Final Score: r₁ = 0.89\nAttendance vs Final Score: r₂ = 0.92\nPrevious Score vs Final Score: r₃ = 0.95\nSleep Hours vs Final Score: r₄ = 0.78\nStrongest correlation: Previous Score (0.95)',
          result: 'Previous Score has highest correlation',
          explanation: 'Previous academic performance is the strongest predictor of final exam scores.'
        },
        {
          step: 3,
          title: 'Simple Linear Regression (Previous Score)',
          formula: 'β₁ = Σ((xᵢ - x̄)(yᵢ - ȳ)) / Σ((xᵢ - x̄)²)',
          calculation: 'Numerator: (85-76.625)(92-83.375) + ... + (55-76.625)(65-83.375) = 1247.5\nDenominator: (85-76.625)² + ... + (55-76.625)² = 1356.875\nβ₁ = 1247.5 / 1356.875 = 0.919',
          result: 'Slope β₁ = 0.919',
          explanation: 'For every 1-point increase in previous score, final score increases by 0.919 points.'
        },
        {
          step: 4,
          title: 'Calculate Intercept',
          formula: 'β₀ = ȳ - β₁ × x̄',
          calculation: 'β₀ = 83.375 - 0.919 × 76.625 = 83.375 - 70.416 = 12.959',
          result: 'Intercept β₀ = 12.959',
          explanation: 'The intercept represents the baseline final score when previous score is zero.'
        },
        {
          step: 5,
          title: 'Final Regression Equation',
          formula: 'ŷ = β₀ + β₁ × x',
          calculation: 'Final Score = 12.959 + 0.919 × Previous Score',
          result: 'Final Score = 12.959 + 0.919 × Previous Score',
          explanation: 'This equation predicts final exam scores based on previous academic performance.'
        },
        {
          step: 6,
          title: 'Calculate R² (Model Accuracy)',
          formula: 'R² = 1 - (SSres / SStot)',
          calculation: 'Predicted values: [91.1, 84.6, 95.7, 72.6, 88.3, 93.6, 77.2, 63.4]\nSSres = Σ(yᵢ - ŷᵢ)² = 45.2\nSStot = Σ(yᵢ - ȳ)² = 476.875\nR² = 1 - (45.2 / 476.875) = 0.905',
          result: 'R² = 0.905 (90.5% accuracy)',
          explanation: 'The model explains 90.5% of the variance in final exam scores, indicating excellent predictive power.'
        }
      ],
      finalResult: 'The linear regression model achieved 90.5% accuracy in predicting final exam scores. Previous academic performance is the strongest predictor, with the equation: Final Score = 12.959 + 0.919 × Previous Score.',
      prediction: {
        newCase: [80],
        result: 86.48,
        explanation: 'For a student with previous score of 80: Final Score = 12.959 + 0.919 × 80 = 86.48'
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
      title: 'Credit Card Approval System',
      dataset: {
        description: 'Predicting credit card approval based on applicant financial profile',
        features: ['Age', 'Income', 'Credit Score', 'Debt Ratio', 'Approved'],
        data: [
          [25, 35000, 650, 0.4, 0],
          [35, 55000, 720, 0.3, 1],
          [45, 75000, 780, 0.2, 1],
          [28, 40000, 680, 0.5, 0],
          [52, 85000, 800, 0.1, 1],
          [30, 45000, 700, 0.35, 1],
          [38, 60000, 750, 0.25, 1],
          [26, 30000, 620, 0.6, 0]
        ]
      },
      calculations: [
        {
          step: 1,
          title: 'Calculate Initial Entropy',
          formula: 'Entropy(S) = -Σ(pᵢ × log₂(pᵢ))',
          calculation: 'Total samples: 8\nApproved: 5, Rejected: 3\np(approved) = 5/8 = 0.625, p(rejected) = 3/8 = 0.375\nEntropy = -(0.625×log₂(0.625)) - (0.375×log₂(0.375))\nEntropy = -(0.625×(-0.678)) - (0.375×(-1.415)) = 0.424 + 0.531',
          result: 'Initial Entropy = 0.955',
          explanation: 'High entropy indicates the dataset is mixed with both approved and rejected applications.'
        },
        {
          step: 2,
          title: 'Test Split on Credit Score ≤ 700',
          formula: 'Information Gain = Entropy(S) - Σ(|Sᵥ|/|S| × Entropy(Sᵥ))',
          calculation: 'Left (Credit ≤ 700): [650,680,700,620] → 1 approved, 3 rejected\nEntropy_left = -(1/4×log₂(1/4)) - (3/4×log₂(3/4)) = 0.811\nRight (Credit > 700): [720,780,800,750] → 4 approved, 0 rejected\nEntropy_right = 0 (pure)\nWeighted entropy = (4/8×0.811) + (4/8×0) = 0.406\nGain = 0.955 - 0.406',
          result: 'Information Gain = 0.549',
          explanation: 'Credit score provides excellent separation between approved and rejected applications.'
        },
        {
          step: 3,
          title: 'Test Split on Income ≤ 50000',
          formula: 'Information Gain = Entropy(S) - Σ(|Sᵥ|/|S| × Entropy(Sᵥ))',
          calculation: 'Left (Income ≤ 50000): [35000,40000,45000,30000] → 1 approved, 3 rejected\nEntropy_left = 0.811\nRight (Income > 50000): [55000,75000,85000,60000] → 4 approved, 0 rejected\nEntropy_right = 0\nWeighted entropy = (4/8×0.811) + (4/8×0) = 0.406\nGain = 0.955 - 0.406',
          result: 'Information Gain = 0.549',
          explanation: 'Income split gives the same information gain as credit score.'
        },
        {
          step: 4,
          title: 'Choose Best Split (Credit Score ≤ 700)',
          formula: 'Best Split = argmax(Information Gain)',
          calculation: 'Credit Score ≤ 700: Gain = 0.549\nIncome ≤ 50000: Gain = 0.549\nAge ≤ 35: Gain = 0.311\nDebt Ratio ≤ 0.4: Gain = 0.423\nChoose Credit Score ≤ 700 (financial relevance)',
          result: 'Root: Credit Score ≤ 700?',
          explanation: 'Credit score is chosen as the primary split criterion for financial decision making.'
        },
        {
          step: 5,
          title: 'Split Left Subtree (Credit ≤ 700)',
          formula: 'Further split on Debt Ratio ≤ 0.4',
          calculation: 'Left subtree: [25,35000,650,0.4,0], [28,40000,680,0.5,0], [30,45000,700,0.35,1], [26,30000,620,0.6,0]\nSplit on Debt Ratio ≤ 0.4:\nLeft: [25,35000,650,0.4,0], [30,45000,700,0.35,1] → 1 approved, 1 rejected\nRight: [28,40000,680,0.5,0], [26,30000,620,0.6,0] → 0 approved, 2 rejected\nGain = 0.811 - (2/4×1.0 + 2/4×0) = 0.311',
          result: 'Secondary split on debt ratio',
          explanation: 'Among low credit score applicants, debt ratio becomes the deciding factor.'
        },
        {
          step: 6,
          title: 'Final Decision Rules',
          formula: 'IF-THEN rules from tree paths',
          calculation: 'Rule 1: IF Credit Score > 700 THEN Approved\nRule 2: IF Credit Score ≤ 700 AND Debt Ratio ≤ 0.4 THEN Check individually\nRule 3: IF Credit Score ≤ 700 AND Debt Ratio > 0.4 THEN Rejected\nTree depth: 3 levels, Accuracy: 100% on training data',
          result: 'Decision tree complete',
          explanation: 'The tree creates clear, interpretable rules for credit approval decisions.'
        }
      ],
      finalResult: 'The decision tree achieved 100% accuracy on training data with clear rules: High credit score (>700) leads to approval, while low credit score requires low debt ratio (<0.4) for consideration.',
      prediction: {
        newCase: [32, 50000, 720, 0.3],
        result: 'Approved',
        explanation: 'Credit Score = 720 > 700, so following the right branch → Approved'
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
      title: 'E-commerce Customer Segmentation',
      dataset: {
        description: 'Segmenting customers based on purchase behavior and demographics',
        features: ['Age', 'Annual Income', 'Purchase Frequency', 'Average Order Value'],
        data: [
          [25, 35000, 12, 85],
          [30, 40000, 15, 95],
          [28, 38000, 10, 75],
          [45, 75000, 8, 180],
          [50, 80000, 6, 200],
          [48, 78000, 7, 175],
          [65, 45000, 20, 65],
          [70, 50000, 25, 70]
        ]
      },
      calculations: [
        {
          step: 1,
          title: 'Initialize 3 Centroids (K=3)',
          formula: 'C₁ = (x₁, y₁, z₁, w₁), C₂ = (x₂, y₂, z₂, w₂), C₃ = (x₃, y₃, z₃, w₃)',
          calculation: 'C₁ = (30, 40000, 12, 85) - Young Frequent Buyers\nC₂ = (50, 75000, 7, 180) - Middle-aged Premium Buyers\nC₃ = (65, 45000, 22, 65) - Senior Value Buyers',
          result: 'Initial centroids placed',
          explanation: 'We start with 3 centroids representing different customer segments based on age and spending patterns.'
        },
        {
          step: 2,
          title: 'Calculate Distances (Iteration 1)',
          formula: 'distance = √[(x₁-x₂)² + (y₁-y₂)² + (z₁-z₂)² + (w₁-w₂)²]',
          calculation: 'Point [25, 35000, 12, 85]:\nd₁ = √[(25-30)² + (35000-40000)² + (12-12)² + (85-85)²] = √[25 + 25000000 + 0 + 0] = 5000.0\nd₂ = √[(25-50)² + (35000-75000)² + (12-7)² + (85-180)²] = √[625 + 1600000000 + 25 + 9025] = 40000.6\nd₃ = √[(25-65)² + (35000-45000)² + (12-22)² + (85-65)²] = √[1600 + 100000000 + 100 + 400] = 10000.2',
          result: 'Assign to Cluster 1 (closest)',
          explanation: 'Each customer is assigned to the nearest centroid based on Euclidean distance across all features.'
        },
        {
          step: 3,
          title: 'Assign All Customers to Clusters',
          formula: 'cluster[i] = argmin(distance(customer[i], centroid[j]))',
          calculation: 'Cluster 1 (Young Frequent): [25,35000,12,85], [30,40000,15,95], [28,38000,10,75]\nCluster 2 (Premium): [45,75000,8,180], [50,80000,6,200], [48,78000,7,175]\nCluster 3 (Senior Value): [65,45000,20,65], [70,50000,25,70]',
          result: '3 customer segments formed',
          explanation: 'Customers naturally group into young frequent buyers, premium buyers, and senior value-conscious buyers.'
        },
        {
          step: 4,
          title: 'Update Centroids (Iteration 1)',
          formula: 'new_centroid = (mean(ages), mean(incomes), mean(frequencies), mean(order_values))',
          calculation: 'C₁ = ((25+30+28)/3, (35000+40000+38000)/3, (12+15+10)/3, (85+95+75)/3) = (27.7, 37667, 12.3, 85)\nC₂ = ((45+50+48)/3, (75000+80000+78000)/3, (8+6+7)/3, (180+200+175)/3) = (47.7, 77667, 7, 185)\nC₃ = ((65+70)/2, (45000+50000)/2, (20+25)/2, (65+70)/2) = (67.5, 47500, 22.5, 67.5)',
          result: 'Centroids moved to cluster centers',
          explanation: 'New centroids are calculated as the mean position of all customers in each cluster.'
        },
        {
          step: 5,
          title: 'Check Convergence',
          formula: 'convergence = Σ|new_centroid - old_centroid| < tolerance',
          calculation: 'Centroid movement:\nC₁: √[(27.7-30)² + (37667-40000)² + (12.3-12)² + (85-85)²] = 2333.3\nC₂: √[(47.7-50)² + (77667-75000)² + (7-7)² + (185-180)²] = 2667.3\nC₃: √[(67.5-65)² + (47500-45000)² + (22.5-22)² + (67.5-65)²] = 2500.3\nTotal movement = 7500.9 > tolerance (100)',
          result: 'Not converged, continue',
          explanation: 'Centroids moved significantly, indicating the algorithm needs more iterations to converge.'
        },
        {
          step: 6,
          title: 'Final Cluster Characteristics',
          formula: 'Cluster profiles after convergence',
          calculation: 'Cluster 1 - Young Frequent Buyers:\nAvg Age: 27.7, Avg Income: $37,667, Avg Frequency: 12.3, Avg Order: $85\n\nCluster 2 - Premium Buyers:\nAvg Age: 47.7, Avg Income: $77,667, Avg Frequency: 7, Avg Order: $185\n\nCluster 3 - Senior Value Buyers:\nAvg Age: 67.5, Avg Income: $47,500, Avg Frequency: 22.5, Avg Order: $67.5',
          result: 'Three distinct customer segments identified',
          explanation: 'K-means successfully identified three customer segments with distinct purchasing behaviors and demographics.'
        }
      ],
      finalResult: 'K-means successfully segmented customers into 3 groups: Young Frequent Buyers (high frequency, low value), Premium Buyers (low frequency, high value), and Senior Value Buyers (very high frequency, low value). This segmentation enables targeted marketing strategies.',
      prediction: {
        newCase: [40, 60000, 10, 120],
        result: 'Cluster 2 (Premium Buyers)',
        explanation: 'Customer aged 40 with $60K income is closest to Premium Buyers centroid based on age and spending pattern'
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
      title: 'Medical Diagnosis Classification',
      dataset: {
        description: 'Classifying patients as having disease (1) or healthy (-1) based on medical test results',
        features: ['Blood Pressure', 'Cholesterol', 'Blood Sugar', 'BMI', 'Diagnosis'],
        data: [
          [120, 180, 90, 22, -1],
          [130, 200, 95, 25, -1],
          [125, 190, 88, 23, -1],
          [160, 280, 140, 32, 1],
          [170, 300, 150, 35, 1],
          [165, 290, 145, 33, 1],
          [140, 220, 110, 28, 1],
          [135, 210, 105, 26, -1]
        ]
      },
      calculations: [
        {
          step: 1,
          title: 'Scale Features',
          formula: 'X_scaled = (X - mean) / std',
          calculation: 'Blood Pressure: mean=143.1, std=19.2\nCholesterol: mean=233.8, std=47.8\nBlood Sugar: mean=115.4, std=24.8\nBMI: mean=28.0, std=4.8\n\nScaled features for [120,180,90,22]:\n[(120-143.1)/19.2, (180-233.8)/47.8, (90-115.4)/24.8, (22-28.0)/4.8]\n= [-1.20, -1.13, -1.02, -1.25]',
          result: 'Features normalized',
          explanation: 'Feature scaling ensures all medical measurements contribute equally to the SVM decision boundary.'
        },
        {
          step: 2,
          title: 'Choose RBF Kernel',
          formula: 'K(x_i, x_j) = exp(-γ||x_i - x_j||²)',
          calculation: 'RBF kernel selected for non-linear medical data\nγ = 1/(n_features × variance) = 1/(4 × 1) = 0.25\nRegularization parameter C = 1.0\nKernel matrix computed for all training pairs',
          result: 'RBF SVM configured',
          explanation: 'RBF kernel can capture complex non-linear relationships between medical parameters and disease diagnosis.'
        },
        {
          step: 3,
          title: 'Solve Optimization Problem',
          formula: 'Minimize: ½||w||² + C∑ξᵢ subject to yᵢ(w·φ(xᵢ) + b) ≥ 1 - ξᵢ',
          calculation: 'Dual formulation with RBF kernel:\nMaximize: ∑αᵢ - ½∑∑αᵢαⱼyᵢyⱼK(xᵢ,xⱼ)\nSubject to: ∑αᵢyᵢ = 0, 0 ≤ αᵢ ≤ C\nSolved using Sequential Minimal Optimization (SMO)',
          result: 'Optimal α values found',
          explanation: 'The optimization finds the hyperplane in feature space that best separates healthy from diseased patients.'
        },
        {
          step: 4,
          title: 'Identify Support Vectors',
          formula: 'Support vectors: points where αᵢ > 0',
          calculation: 'Support vectors identified:\nSV1: [130,200,95,25,-1] with α₁ = 0.4 (healthy boundary)\nSV2: [140,220,110,28,+1] with α₂ = 0.6 (disease boundary)\nSV3: [135,210,105,26,-1] with α₃ = 0.2 (healthy boundary)\nThese patients define the decision boundary',
          result: '3 support vectors identified',
          explanation: 'Support vectors are the critical patients whose medical profiles define the diagnostic boundary.'
        },
        {
          step: 5,
          title: 'Calculate Decision Function',
          formula: 'f(x) = ∑αᵢyᵢK(xᵢ,x) + b',
          calculation: 'Decision function components:\nα₁y₁ = 0.4 × (-1) = -0.4\nα₂y₂ = 0.6 × (+1) = +0.6\nα₃y₃ = 0.2 × (-1) = -0.2\n\nBias term b calculated using support vectors:\nb = y₁ - ∑αⱼyⱼK(xⱼ,x₁) = -0.15',
          result: 'Decision function: f(x) = ∑αᵢyᵢK(xᵢ,x) - 0.15',
          explanation: 'The decision function uses support vectors to classify new patients based on their medical profile similarity.'
        },
        {
          step: 6,
          title: 'Model Performance',
          formula: 'Accuracy = (TP + TN) / (TP + TN + FP + FN)',
          calculation: 'Training set predictions:\nHealthy patients: 4/4 correctly classified\nDiseased patients: 4/4 correctly classified\nAccuracy = 8/8 = 100%\n\nMargin width: 2/||w|| = 1.85 (good separation)\nSupport vector ratio: 3/8 = 37.5% (reasonable)',
          result: '100% training accuracy',
          explanation: 'The SVM achieved perfect classification on training data with good margin separation between classes.'
        }
      ],
      finalResult: 'The SVM successfully learned a non-linear decision boundary that perfectly separates healthy from diseased patients using RBF kernel. The model identified 3 critical support vectors that define the diagnostic boundary.',
      prediction: {
        newCase: [150, 250, 120, 30],
        result: 'Disease (+1)',
        explanation: 'Patient with elevated BP (150), cholesterol (250), blood sugar (120), and BMI (30) classified as having disease'
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
      title: 'Employee Performance Prediction',
      dataset: {
        description: 'Predicting employee performance rating based on work metrics',
        features: ['Experience Years', 'Projects Completed', 'Training Hours', 'Team Size', 'Performance'],
        data: [
          [2, 8, 40, 5, 'Good'],
          [5, 15, 60, 8, 'Excellent'],
          [1, 3, 20, 3, 'Average'],
          [8, 25, 80, 12, 'Excellent'],
          [3, 10, 45, 6, 'Good'],
          [6, 18, 70, 10, 'Excellent'],
          [1, 5, 25, 4, 'Average'],
          [4, 12, 50, 7, 'Good']
        ]
      },
      calculations: [
        {
          step: 1,
          title: 'Create Bootstrap Sample 1',
          formula: 'Bootstrap sampling with replacement',
          calculation: 'Sample 1 (indices): [0, 2, 4, 6, 1, 3, 7, 5]\nData: [[2,8,40,5,Good], [1,3,20,3,Average], [3,10,45,6,Good], [1,5,25,4,Average], [5,15,60,8,Excellent], [8,25,80,12,Excellent], [4,12,50,7,Good], [6,18,70,10,Excellent]]\nClass distribution: 3 Good, 2 Average, 3 Excellent',
          result: 'Balanced bootstrap sample created',
          explanation: 'First bootstrap sample created with replacement, maintaining diverse performance ratings.'
        },
        {
          step: 2,
          title: 'Build Tree 1 with Random Features',
          formula: 'Random feature selection: √4 = 2 features per split',
          calculation: 'Available features: [Experience, Projects, Training, Team Size]\nSelected for root split: [Experience, Projects]\nBest split: Experience ≥ 4\nLeft (Exp < 4): 4 samples → 2 Good, 2 Average\nRight (Exp ≥ 4): 4 samples → 1 Good, 3 Excellent\nTree 1 rule: IF Experience ≥ 4 THEN likely Excellent/Good ELSE Average/Good',
          result: 'Tree 1 built with 85% accuracy',
          explanation: 'Tree 1 uses experience as primary indicator, showing experienced employees perform better.'
        },
        {
          step: 3,
          title: 'Create Bootstrap Sample 2',
          formula: 'Different bootstrap sample',
          calculation: 'Sample 2 (indices): [1, 3, 5, 7, 0, 2, 4, 6]\nData: [[5,15,60,8,Excellent], [8,25,80,12,Excellent], [6,18,70,10,Excellent], [4,12,50,7,Good], [2,8,40,5,Good], [1,3,20,3,Average], [3,10,45,6,Good], [1,5,25,4,Average]]\nClass distribution: 3 Good, 2 Average, 3 Excellent',
          result: 'Different sample distribution',
          explanation: 'Second bootstrap sample has different data points, leading to different tree structure.'
        },
        {
          step: 4,
          title: 'Build Tree 2 with Different Features',
          formula: 'Random feature selection: [Training Hours, Team Size]',
          calculation: 'Selected features: [Training Hours, Team Size]\nBest split: Training Hours ≥ 50\nLeft (Training < 50): 4 samples → 2 Good, 2 Average\nRight (Training ≥ 50): 4 samples → 1 Good, 3 Excellent\nTree 2 rule: IF Training Hours ≥ 50 THEN likely Excellent ELSE Average/Good',
          result: 'Tree 2 built with 80% accuracy',
          explanation: 'Tree 2 focuses on training hours, showing well-trained employees perform better.'
        },
        {
          step: 5,
          title: 'Build Tree 3 with Projects Focus',
          formula: 'Random feature selection: [Projects, Team Size]',
          calculation: 'Selected features: [Projects Completed, Team Size]\nBest split: Projects ≥ 12\nLeft (Projects < 12): 5 samples → 2 Good, 2 Average, 1 Excellent\nRight (Projects ≥ 12): 3 samples → 0 Good, 0 Average, 3 Excellent\nTree 3 rule: IF Projects ≥ 12 THEN Excellent ELSE Mixed',
          result: 'Tree 3 built with 90% accuracy',
          explanation: 'Tree 3 emphasizes project completion, showing high achievers get excellent ratings.'
        },
        {
          step: 6,
          title: 'Combine Predictions (Voting)',
          formula: 'Majority voting across all trees',
          calculation: 'Test case: [Experience=7, Projects=20, Training=75, Team=9]\nTree 1 prediction: Excellent (Experience ≥ 4)\nTree 2 prediction: Excellent (Training ≥ 50)\nTree 3 prediction: Excellent (Projects ≥ 12)\nVoting: 3 votes for Excellent, 0 for Good, 0 for Average\n\nFeature Importance:\nExperience: 0.35, Projects: 0.30, Training: 0.25, Team Size: 0.10',
          result: 'Final: Excellent',
          explanation: 'Random Forest combines diverse decision trees through majority voting, providing robust predictions.'
        }
      ],
      finalResult: 'The Random Forest with 100 trees achieves 95% accuracy by combining diverse decision trees. Each tree focuses on different aspects (experience, training, projects), making the ensemble more robust and accurate than any single tree.',
      prediction: {
        newCase: [3, 14, 55, 8],
        result: 'Good',
        explanation: 'Employee with 3 years experience, 14 projects, 55 training hours: 70% of trees predict Good performance'
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
      title: 'Stock Price Movement Prediction',
      dataset: {
        description: 'Predicting if stock price will go up (1) or down (0) based on technical indicators',
        features: ['RSI', 'MACD', 'Volume Ratio', 'Price Change %', 'Direction'],
        data: [
          [30, -0.5, 1.2, -2.1, 0],
          [70, 0.8, 1.8, 3.2, 1],
          [45, 0.2, 1.1, 0.5, 1],
          [25, -0.8, 0.9, -3.5, 0],
          [65, 0.6, 1.5, 2.8, 1],
          [35, -0.3, 1.0, -1.2, 0],
          [75, 1.0, 2.0, 4.1, 1],
          [20, -1.2, 0.8, -4.8, 0]
        ]
      },
      calculations: [
        {
          step: 1,
          title: 'Network Architecture Design',
          formula: 'Input Layer: 4 neurons, Hidden Layer: 3 neurons, Output Layer: 1 neuron',
          calculation: 'Network: [4, 3, 1]\nActivation: Sigmoid function σ(x) = 1/(1 + e^(-x))\nTotal parameters: (4×3 + 3) + (3×1 + 1) = 19 parameters\nInput features: RSI, MACD, Volume Ratio, Price Change %',
          result: '4-3-1 architecture',
          explanation: 'We design a network with 4 inputs for technical indicators, 3 hidden neurons for pattern recognition, and 1 output for direction prediction.'
        },
        {
          step: 2,
          title: 'Initialize Weights and Biases',
          formula: 'W₁ = 4×3 matrix, W₂ = 3×1 matrix, b₁ = 3×1, b₂ = 1×1',
          calculation: 'W₁ = [[0.5, -0.3, 0.8], [0.2, 0.7, -0.4], [-0.6, 0.4, 0.9], [0.3, -0.5, 0.6]]\nb₁ = [0.1, -0.2, 0.3]\nW₂ = [[0.8], [-0.6], [0.7]]\nb₂ = [0.2]\nTotal 19 parameters initialized using Xavier initialization',
          result: 'Random initialization complete',
          explanation: 'Weights are initialized randomly to break symmetry and allow the network to learn different patterns.'
        },
        {
          step: 3,
          title: 'Forward Pass for Input [70, 0.8, 1.8, 3.2]',
          formula: 'z = W·a + b, a = σ(z)',
          calculation: 'Hidden layer calculations:\nz₁ = [0.5×70 + 0.2×0.8 + (-0.6)×1.8 + 0.3×3.2] + 0.1 = 35.0 + 0.16 - 1.08 + 0.96 + 0.1 = 35.14\na₁ = σ(35.14) ≈ 1.0\n\nz₂ = [-0.3×70 + 0.7×0.8 + 0.4×1.8 + (-0.5)×3.2] + (-0.2) = -21 + 0.56 + 0.72 - 1.6 - 0.2 = -21.52\na₂ = σ(-21.52) ≈ 0.0\n\nz₃ = [0.8×70 + (-0.4)×0.8 + 0.9×1.8 + 0.6×3.2] + 0.3 = 56 - 0.32 + 1.62 + 1.92 + 0.3 = 59.52\na₃ = σ(59.52) ≈ 1.0',
          result: 'Hidden layer: [1.0, 0.0, 1.0]',
          explanation: 'The hidden layer processes the technical indicators and creates internal representations of market patterns.'
        },
        {
          step: 4,
          title: 'Output Layer Calculation',
          formula: 'z_output = W₂·a_hidden + b₂, output = σ(z_output)',
          calculation: 'Output calculation:\nz_output = [0.8×1.0 + (-0.6)×0.0 + 0.7×1.0] + 0.2 = 0.8 + 0 + 0.7 + 0.2 = 1.7\noutput = σ(1.7) = 1/(1 + e^(-1.7)) = 0.845\n\nTarget: 1 (price goes up)\nPrediction: 0.845 (strong upward signal)',
          result: 'Predicted: 0.845, Target: 1',
          explanation: 'The network predicts a strong probability (84.5%) that the stock price will go up, which matches the actual direction.'
        },
        {
          step: 5,
          title: 'Calculate Loss and Backpropagation',
          formula: 'Loss = ½(target - prediction)², δ = (target - output) × σ\'(z)',
          calculation: 'Loss calculation:\nLoss = ½(1 - 0.845)² = ½(0.155)² = 0.012\n\nBackpropagation:\nδ_output = (1 - 0.845) × 0.845 × (1 - 0.845) = 0.155 × 0.131 = 0.020\n\nHidden layer errors:\nδ₁ = δ_output × W₂[0] × a₁ × (1 - a₁) = 0.020 × 0.8 × 1.0 × 0.0 ≈ 0.0\nδ₂ = δ_output × W₂[1] × a₂ × (1 - a₂) = 0.020 × (-0.6) × 0.0 × 1.0 = 0.0\nδ₃ = δ_output × W₂[2] × a₃ × (1 - a₃) = 0.020 × 0.7 × 1.0 × 0.0 ≈ 0.0',
          result: 'Gradients calculated',
          explanation: 'Backpropagation calculates how much each weight contributed to the prediction error for stock direction.'
        },
        {
          step: 6,
          title: 'Weight Updates and Training Progress',
          formula: 'W_new = W_old - learning_rate × gradient',
          calculation: 'Weight updates (learning_rate = 0.1):\nW₂ updates: ΔW₂ = 0.1 × δ_output × hidden_activations\nW₁ updates: ΔW₁ = 0.1 × δ_hidden × input_features\n\nAfter 1000 epochs:\nTraining accuracy: 95%\nValidation accuracy: 87%\nAverage loss: 0.08\nConvergence achieved',
          result: 'Network trained successfully',
          explanation: 'After training on historical stock data, the neural network learns to recognize patterns in technical indicators that predict price movements.'
        }
      ],
      finalResult: 'After 1000 training epochs, the neural network achieved 87% accuracy in predicting stock price direction. The network learned to recognize complex patterns in technical indicators (RSI, MACD, volume, price change) that correlate with future price movements.',
      prediction: {
        newCase: [60, 0.4, 1.3, 1.8],
        result: 0.72,
        explanation: 'Stock with RSI=60, MACD=0.4, Volume=1.3, Change=1.8%: Network predicts 72% probability of price increase'
      }
    }
  }
];