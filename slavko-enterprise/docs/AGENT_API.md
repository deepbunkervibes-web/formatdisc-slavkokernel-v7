# SlavkoKernel™ Agent Era API Documentation

This document outlines the REST API endpoints for the SlavkoKernel™ Agent Era application.

## Base URL

All API endpoints are relative to:

```
https://api.slavkokernel.com/v1
```

For local development:

```
http://localhost:3000/api/v1
```

## Authentication

Most endpoints require authentication. Include an authentication token in the request header:

```
Authorization: Bearer YOUR_TOKEN_HERE
```

## Response Format

All responses follow a standard format:

```json
{
  "success": true|false,
  "data": { ... },  // Response data (if success is true)
  "error": { ... }  // Error details (if success is false)
}
```

## Error Codes

- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `429` - Too Many Requests
- `500` - Internal Server Error

## Endpoints

### Authentication

#### Register User

```
POST /auth/register
```

Request body:

```json
{
  "email": "user@example.com",
  "password": "securepassword",
  "displayName": "User Name"
}
```

Response:

```json
{
  "success": true,
  "data": {
    "uid": "user123",
    "email": "user@example.com",
    "displayName": "User Name"
  }
}
```

#### Login

```
POST /auth/login
```

Request body:

```json
{
  "email": "user@example.com",
  "password": "securepassword"
}
```

Response:

```json
{
  "success": true,
  "data": {
    "token": "auth-token-here",
    "user": {
      "uid": "user123",
      "email": "user@example.com",
      "displayName": "User Name"
    }
  }
}
```

### User Profile

#### Get User Profile

```
GET /users/profile
```

Response:

```json
{
  "success": true,
  "data": {
    "uid": "user123",
    "email": "user@example.com",
    "displayName": "User Name",
    "photoURL": "https://example.com/photo.jpg",
    "isPremium": false,
    "createdAt": "2023-01-01T00:00:00Z"
  }
}
```

#### Update User Profile

```
PUT /users/profile
```

Request body:

```json
{
  "displayName": "New Name",
  "photoURL": "https://example.com/new-photo.jpg"
}
```

Response:

```json
{
  "success": true,
  "data": {
    "uid": "user123",
    "displayName": "New Name",
    "photoURL": "https://example.com/new-photo.jpg"
  }
}
```

### XP System

#### Get User XP Profile

```
GET /xp/profile
```

Response:

```json
{
  "success": true,
  "data": {
    "totalXP": 1250,
    "level": 5,
    "currentLevelXP": 50,
    "nextLevelThreshold": 300,
    "achievements": [
      {
        "id": "first_login",
        "name": "First Steps",
        "description": "Logged in for the first time",
        "earnedAt": "2023-01-01T00:00:00Z",
        "xpAwarded": 100
      }
    ],
    "streakData": {
      "currentStreak": 3,
      "longestStreak": 5
    }
  }
}
```

#### Award XP

```
POST /xp/award
```

Request body:

```json
{
  "actionId": "complete_profile",
  "description": "Completed user profile"
}
```

Response:

```json
{
  "success": true,
  "data": {
    "xpAwarded": 50,
    "newTotalXP": 1300,
    "levelUp": false
  }
}
```

#### Get Leaderboard

```
GET /xp/leaderboard?timeframe=all&limit=10
```

Parameters:

- `timeframe`: `all`, `weekly`, or `monthly` (default: `all`)
- `limit`: Number of entries to return (default: 10)

Response:

```json
{
  "success": true,
  "data": {
    "leaderboard": [
      {
        "userId": "user123",
        "username": "User Name",
        "avatarUrl": "https://example.com/photo.jpg",
        "totalXP": 1500,
        "level": 6,
        "rank": 1
      },
      {
        "userId": "user456",
        "username": "Another User",
        "avatarUrl": "https://example.com/photo2.jpg",
        "totalXP": 1300,
        "level": 5,
        "rank": 2
      }
    ]
  }
}
```

#### Get Achievements

```
GET /xp/achievements
```

Response:

```json
{
  "success": true,
  "data": {
    "earned": [
      {
        "id": "first_login",
        "name": "First Steps",
        "description": "Logged in for the first time",
        "earnedAt": "2023-01-01T00:00:00Z",
        "xpAwarded": 100,
        "iconUrl": "/icons/achievements/first_login.svg"
      }
    ],
    "available": [
      {
        "id": "profile_complete",
        "name": "Identity Established",
        "description": "Complete your profile",
        "xpReward": 50,
        "iconUrl": "/icons/achievements/profile_complete.svg"
      }
    ]
  }
}
```

### AI Agents

#### Generate Counter Narrative

```
POST /ai/counter-narrative
```

Request body:

```json
{
  "narrative": "Climate change is not caused by human activity.",
  "style": "academic"
}
```

Response:

```json
{
  "success": true,
  "data": {
    "counterArgument": "Scientific consensus strongly supports that climate change is primarily driven by human activities...",
    "keyPoints": [
      "97% of climate scientists agree on anthropogenic causes",
      "Greenhouse gas emissions have increased dramatically since the industrial revolution",
      "Natural climate cycles cannot explain the rapid warming observed"
    ],
    "suggestedEvidence": [
      "IPCC Sixth Assessment Report (2021)",
      "NASA Global Climate Change data"
    ]
  }
}
```

#### Hallucination Auditor

```
POST /ai/hallucination-audit
```

Request body:

```json
{
  "content": "The first human landed on Mars in 2015.",
  "context": "As of 2023, no human has yet landed on Mars."
}
```

Response:

```json
{
  "success": true,
  "data": {
    "score": 2,
    "analysis": "The statement contains a significant factual error.",
    "potentialHallucinations": [
      {
        "statement": "The first human landed on Mars in 2015.",
        "confidence": 0.98,
        "explanation": "No human has landed on Mars as of 2023."
      }
    ],
    "suggestedCorrections": [
      {
        "original": "The first human landed on Mars in 2015.",
        "correction": "As of 2023, no human has yet landed on Mars."
      }
    ]
  }
}
```

#### Dream to Design

```
POST /ai/dream-to-design
```

Request body:

```json
{
  "dreamDescription": "I was floating through a forest where the trees were made of crystal and the leaves were small galaxies.",
  "designStyle": "modern minimalist"
}
```

Response:

```json
{
  "success": true,
  "data": {
    "designConcept": "A modern minimalist space inspired by cosmic forests...",
    "moodBoard": [
      "Crystal-inspired glass coffee table with galaxy-like patterns",
      "Ceiling installation of hanging crystal elements that catch and refract light"
    ],
    "colorPalette": [
      "#1A2B3C - Deep Space Blue",
      "#7B68EE - Galaxy Purple",
      "#E6E6FA - Crystal White"
    ],
    "keyElements": [
      "Crystal-inspired furniture with clean lines",
      "Galaxy-patterned accent wall"
    ],
    "visualizationPrompt": "A minimalist living room with crystal-inspired furniture..."
  }
}
```

#### Simulate Philosopher

```
POST /ai/simulate-philosopher
```

Request body:

```json
{
  "philosopher": "socrates",
  "userMessage": "What is the nature of knowledge?",
  "conversationHistory": [
    {
      "role": "user",
      "content": "Hello, I'd like to discuss philosophy."
    },
    {
      "role": "philosopher",
      "content": "Greetings! I am Socrates. I know that I know nothing, which is the beginning of wisdom. What shall we examine together?"
    }
  ]
}
```

Response:

```json
{
  "success": true,
  "data": {
    "response": "Ah, you ask about the nature of knowledge! A most excellent question...",
    "analysis": "This response reflects Socrates' epistemological approach of questioning assumptions and his belief that true knowledge requires recognizing one's own ignorance."
  }
}
```

#### Analyze Emotions

```
POST /ai/analyze-emotions
```

Request body:

```json
{
  "imageUrl": "https://example.com/facial-expression.jpg",
  "context": "Job interview setting"
}
```

Response:

```json
{
  "success": true,
  "data": {
    "primaryEmotion": "Nervousness",
    "emotionConfidence": 0.85,
    "secondaryEmotions": ["Excitement", "Determination"],
    "facialFeatures": {
      "eyes": "Widened with occasional darting",
      "mouth": "Slight tension at corners",
      "brows": "Slightly raised",
      "overall": "Moderate tension in facial muscles"
    },
    "analysis": "The subject displays classic signs of interview anxiety mixed with determination...",
    "suggestions": [
      "Take deep breaths to reduce visible tension",
      "Practice power posing before the interview to boost confidence"
    ]
  }
}
```

### Subscription Management

#### Get Subscription Plans

```
GET /subscriptions/plans
```

Response:

```json
{
  "success": true,
  "data": {
    "plans": [
      {
        "id": "basic",
        "name": "Basic",
        "price": 0,
        "features": [
          "Access to 3 AI agents",
          "5 queries per day",
          "Standard response time"
        ]
      },
      {
        "id": "premium",
        "name": "Premium",
        "price": 9.99,
        "features": [
          "Access to all AI agents",
          "Unlimited queries",
          "Priority response time",
          "10% XP boost"
        ]
      }
    ]
  }
}
```

#### Get User Subscription

```
GET /subscriptions/user
```

Response:

```json
{
  "success": true,
  "data": {
    "plan": "premium",
    "startDate": "2023-01-01T00:00:00Z",
    "renewalDate": "2023-02-01T00:00:00Z",
    "status": "active"
  }
}
```

#### Create Subscription

```
POST /subscriptions/create
```

Request body:

```json
{
  "planId": "premium",
  "paymentMethodId": "pm_card_visa"
}
```

Response:

```json
{
  "success": true,
  "data": {
    "subscriptionId": "sub_12345",
    "plan": "premium",
    "startDate": "2023-01-01T00:00:00Z",
    "renewalDate": "2023-02-01T00:00:00Z",
    "status": "active"
  }
}
```

#### Cancel Subscription

```
POST /subscriptions/cancel
```

Response:

```json
{
  "success": true,
  "data": {
    "subscriptionId": "sub_12345",
    "plan": "premium",
    "endDate": "2023-02-01T00:00:00Z",
    "status": "canceled"
  }
}
```

### Blog

#### Get Blog Posts

```
GET /blog/posts?limit=10&page=1
```

Parameters:

- `limit`: Number of posts per page (default: 10)
- `page`: Page number (default: 1)
- `tag`: Filter by tag (optional)

Response:

```json
{
  "success": true,
  "data": {
    "posts": [
      {
        "id": "post123",
        "title": "Introducing SlavkoKernel XP System",
        "slug": "introducing-slavkokernel-xp-system",
        "excerpt": "Learn about our new gamification system...",
        "coverImage": "https://example.com/blog/cover1.jpg",
        "author": {
          "name": "John Doe",
          "avatar": "https://example.com/avatars/john.jpg"
        },
        "publishedAt": "2023-01-15T00:00:00Z",
        "tags": ["XP System", "Gamification"]
      }
    ],
    "pagination": {
      "total": 25,
      "pages": 3,
      "currentPage": 1,
      "hasNext": true,
      "hasPrev": false
    }
  }
}
```

#### Get Blog Post by Slug

```
GET /blog/posts/introducing-slavkokernel-xp-system
```

Response:

```json
{
  "success": true,
  "data": {
    "id": "post123",
    "title": "Introducing SlavkoKernel XP System",
    "slug": "introducing-slavkokernel-xp-system",
    "content": "# Introducing SlavkoKernel XP System\n\nWe're excited to announce...",
    "coverImage": "https://example.com/blog/cover1.jpg",
    "author": {
      "name": "John Doe",
      "avatar": "https://example.com/avatars/john.jpg",
      "bio": "Product Manager at SlavkoKernel"
    },
    "publishedAt": "2023-01-15T00:00:00Z",
    "tags": ["XP System", "Gamification"],
    "relatedPosts": [
      {
        "id": "post456",
        "title": "Maximizing Your XP Gains",
        "slug": "maximizing-your-xp-gains",
        "excerpt": "Tips and tricks for leveling up faster..."
      }
    ]
  }
}
```
