import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as quoteService from '@/services/quote.service';

export const QUOTES_QUERY_KEY = ['quotes'];

// List quotes
export const useQuotes = (params?: quoteService.QuoteListParams) => {
  return useQuery({
    queryKey: [...QUOTES_QUERY_KEY, params],
    queryFn: () => quoteService.listQuotes(params),
  });
};

// Get single quote
export const useQuote = (id: string) => {
  return useQuery({
    queryKey: [...QUOTES_QUERY_KEY, id],
    queryFn: () => quoteService.getQuote(id),
    enabled: !!id,
  });
};

// Create quote mutation
export const useCreateQuote = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: quoteService.CreateQuoteRequest) =>
      quoteService.createQuote(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUOTES_QUERY_KEY });
    },
  });
};

// Update quote mutation
export const useUpdateQuote = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: quoteService.UpdateQuoteRequest }) =>
      quoteService.updateQuote(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: QUOTES_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: [...QUOTES_QUERY_KEY, id] });
    },
  });
};

// Update quote status mutation
export const useUpdateQuoteStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      quoteService.updateQuoteStatus(id, status),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: QUOTES_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: [...QUOTES_QUERY_KEY, id] });
    },
  });
};

// Delete quote mutation
export const useDeleteQuote = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => quoteService.deleteQuote(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUOTES_QUERY_KEY });
    },
  });
};

