// __tests__/Search.test.js

import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import Search from '../app/search/[query]';

// Mocking useLocalSearchParams hook
jest.mock('expo-router', () => ({
  useLocalSearchParams: jest.fn(() => ({
    query: 'chicken',
    minCalories: 0,
    maxCalories: 2000,
    minCookingTime: 0,
    maxCookingTime: 180,
    difficulty: 'easy',
  })),
  Link: ({ href, children }) => {
    return <a href={href}>{children}</a>;
  },
}));

// Mocking useSearchRecipes hook
jest.mock('@/api/recipes', () => ({
  useSearchRecipes: jest.fn(),
}));

describe('Search component', () => {
  it('should render loading state initially', async () => {
    // Mock loading state
    jest.spyOn(require('@/api/recipes'), 'useSearchRecipes').mockReturnValue({
      data: [],
      error: null,
      isLoading: true,
    });

    const { getByTestId } = render(<Search />);
    await waitFor(() => {
      const loader = getByTestId('loader');
      expect(loader).toBeTruthy();
    });
  });

  it('should render error state if fetching recipes fails', async () => {
    // Mock error state
    jest.spyOn(require('@/api/recipes'), 'useSearchRecipes').mockReturnValue({
      data: [],
      error: 'Failed to fetch recipes.',
      isLoading: false,
    });

    const { getByText } = render(<Search />);
    await waitFor(() => {
      const errorText = getByText('Failed to fetch recipes.');
      expect(errorText).toBeTruthy();
    });
  });

  it('should render recipes correctly', async () => {
    // Mock successful data state
    jest.spyOn(require('@/api/recipes'), 'useSearchRecipes').mockReturnValue({
      data: [
        { id: 1, title: 'Chicken Curry', image: 'https://example.com/chicken_curry.jpg', cookingTime: 30, difficulty: 'easy', calories: 300 },
        { id: 2, title: 'Grilled Chicken', image: 'https://example.com/grilled_chicken.jpg', cookingTime: 20, difficulty: 'medium', calories: 250 },
      ],
      error: null,
      isLoading: false,
    });

    const { getByText } = render(<Search />);

    // Wait for recipes to be loaded
    await waitFor(() => {
      const chickenCurry = getByText('Chicken Curry');
      const grilledChicken = getByText('Grilled Chicken');

      // Assert that recipe items are rendered
      expect(chickenCurry).toBeTruthy();
      expect(grilledChicken).toBeTruthy();
    });
  });
});
