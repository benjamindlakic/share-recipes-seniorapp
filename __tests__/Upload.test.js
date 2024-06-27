import React from 'react';
import { render } from '@testing-library/react-native';
import { QueryClient, QueryClientProvider } from 'react-query';
import UploadRecipe from '../app/(tabs)/uploadRecipe';

const queryClient = new QueryClient();

describe('<UploadRecipe />', () => {
  it('renders correctly', () => {
    const { getByPlaceholderText } = render(
      <QueryClientProvider client={queryClient}>
        <UploadRecipe />
      </QueryClientProvider>
    );
    // Your test assertions
  });

  it('handles input changes correctly', () => {
    const { getByPlaceholderText } = render(
      <QueryClientProvider client={queryClient}>
        <UploadRecipe />
      </QueryClientProvider>
    );
    // Your test assertions
  });

  it('handles image selection correctly', async () => {
    const { getByText } = render(
      <QueryClientProvider client={queryClient}>
        <UploadRecipe />
      </QueryClientProvider>
    );
    // Your test assertions
  });
});
