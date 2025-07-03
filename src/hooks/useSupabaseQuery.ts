import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { PostgrestError } from '@supabase/supabase-js';
import supabase from '../config/supabaseClient';
import toast from 'react-hot-toast';

// Hook for fetching data from Supabase
export function useSupabaseQuery<T>(
  queryKey: string[],
  tableName: string,
  options?: {
    select?: string;
    filter?: Record<string, any>;
    orderBy?: { column: string; ascending?: boolean };
    limit?: number;
    enabled?: boolean;
  }
) {
  return useQuery<T[], PostgrestError>({
    queryKey,
    queryFn: async () => {
      let query = supabase.from(tableName).select(options?.select || '*');

      // Apply filters
      if (options?.filter) {
        Object.entries(options.filter).forEach(([key, value]) => {
          query = query.eq(key, value);
        });
      }

      // Apply ordering
      if (options?.orderBy) {
        query = query.order(options.orderBy.column, { 
          ascending: options.orderBy.ascending ?? true 
        });
      }

      // Apply limit
      if (options?.limit) {
        query = query.limit(options.limit);
      }

      const { data, error } = await query;

      if (error) {
        toast.error(`خطأ في تحميل البيانات: ${error.message}`);
        throw error;
      }

      return data as T[];
    },
    enabled: options?.enabled ?? true,
  });
}

// Hook for inserting data
export function useSupabaseInsert<T>(
  tableName: string,
  options?: {
    onSuccess?: (data: T) => void;
    onError?: (error: PostgrestError) => void;
    invalidateQueries?: string[][];
  }
) {
  const queryClient = useQueryClient();

  return useMutation<T, PostgrestError, Partial<T>>({
    mutationFn: async (data) => {
      const { data: result, error } = await supabase
        .from(tableName)
        .insert(data)
        .select()
        .single();

      if (error) {
        toast.error(`خطأ في إضافة البيانات: ${error.message}`);
        throw error;
      }

      toast.success('تمت الإضافة بنجاح!');
      return result as T;
    },
    onSuccess: (data) => {
      options?.onSuccess?.(data);
      options?.invalidateQueries?.forEach(queryKey => {
        queryClient.invalidateQueries({ queryKey });
      });
    },
    onError: options?.onError,
  });
}

// Hook for updating data
export function useSupabaseUpdate<T>(
  tableName: string,
  options?: {
    onSuccess?: (data: T) => void;
    onError?: (error: PostgrestError) => void;
    invalidateQueries?: string[][];
  }
) {
  const queryClient = useQueryClient();

  return useMutation<T, PostgrestError, { id: string; data: Partial<T> }>({
    mutationFn: async ({ id, data }) => {
      const { data: result, error } = await supabase
        .from(tableName)
        .update(data)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        toast.error(`خطأ في تحديث البيانات: ${error.message}`);
        throw error;
      }

      toast.success('تم التحديث بنجاح!');
      return result as T;
    },
    onSuccess: (data) => {
      options?.onSuccess?.(data);
      options?.invalidateQueries?.forEach(queryKey => {
        queryClient.invalidateQueries({ queryKey });
      });
    },
    onError: options?.onError,
  });
}

// Hook for deleting data
export function useSupabaseDelete(
  tableName: string,
  options?: {
    onSuccess?: () => void;
    onError?: (error: PostgrestError) => void;
    invalidateQueries?: string[][];
  }
) {
  const queryClient = useQueryClient();

  return useMutation<void, PostgrestError, string>({
    mutationFn: async (id) => {
      const { error } = await supabase
        .from(tableName)
        .delete()
        .eq('id', id);

      if (error) {
        toast.error(`خطأ في الحذف: ${error.message}`);
        throw error;
      }

      toast.success('تم الحذف بنجاح!');
    },
    onSuccess: () => {
      options?.onSuccess?.();
      options?.invalidateQueries?.forEach(queryKey => {
        queryClient.invalidateQueries({ queryKey });
      });
    },
    onError: options?.onError,
  });
}