import React, { useState, useMemo } from 'react';
import { FileText, Globe } from 'lucide-react';
import { useApi } from '../hooks/useApi';
import { Post } from '../types';
import { PostCard } from '../components/PostCard';
import { SearchInput } from '../components/SearchInput';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { ErrorMessage } from '../components/ErrorMessage';
import { Card } from '../components/Card';

export const PostsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { data: posts, loading, error, refetch } = useApi<Post[]>('https://jsonplaceholder.typicode.com/posts');

  const filteredPosts = useMemo(() => {
    if (!posts) return [];
    
    if (!searchQuery) return posts;
    
    return posts.filter(post =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.body.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [posts, searchQuery]);

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto">
        <Card className="text-center py-16">
          <LoadingSpinner size="lg" />
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading posts from API...</p>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-6xl mx-auto">
        <ErrorMessage message={error} onRetry={refetch} />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-3">
          <Globe className="w-8 h-8 text-purple-600" />
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            Blog Posts
          </h1>
        </div>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Explore posts fetched from JSONPlaceholder API. This demonstrates API integration,
          loading states, error handling, and search functionality.
        </p>
      </div>

      {/* Search */}
      <div className="max-w-2xl mx-auto">
        <SearchInput
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search posts by title or content..."
        />
      </div>

      {/* Posts Count */}
      {posts && (
        <div className="flex items-center justify-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
          <div className="flex items-center space-x-2">
            <FileText className="w-4 h-4" />
            <span>
              {searchQuery 
                ? `${filteredPosts.length} of ${posts.length} posts`
                : `${posts.length} posts loaded`
              }
            </span>
          </div>
        </div>
      )}

      {/* Posts Grid */}
      {filteredPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map(post => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <Card className="text-center py-12">
          <div className="flex flex-col items-center space-y-4">
            <FileText className="w-16 h-16 text-gray-400" />
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                No posts found
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {searchQuery 
                  ? `No posts match "${searchQuery}"`
                  : 'No posts available'
                }
              </p>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};