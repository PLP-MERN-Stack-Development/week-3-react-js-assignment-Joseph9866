import React from 'react';
import { User } from 'lucide-react';
import { Post } from '../types';
import { Card } from './Card';

interface PostCardProps {
  post: Post;
}

export const PostCard: React.FC<PostCardProps> = ({ post }) => {
  return (
    <Card hover>
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 line-clamp-2">
            {post.title}
          </h3>
          <div className="flex items-center space-x-1 text-sm text-gray-500 dark:text-gray-400 flex-shrink-0 ml-3">
            <User className="w-4 h-4" />
            <span>User {post.userId}</span>
          </div>
        </div>
        
        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed line-clamp-3">
          {post.body}
        </p>
        
        <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-700">
          <span className="text-xs text-gray-500 dark:text-gray-400">
            Post #{post.id}
          </span>
        </div>
      </div>
    </Card>
  );
};