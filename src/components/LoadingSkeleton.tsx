import React from 'react';
import { Box, Skeleton } from '@mui/material';

interface LoadingSkeletonProps {
  variant?: 'text' | 'rectangular' | 'circular' | 'chat-message' | 'card';
  width?: number | string;
  height?: number | string;
  count?: number;
  animation?: 'pulse' | 'wave' | false;
}

const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({
  variant = 'text',
  width,
  height,
  count = 1,
  animation = 'wave'
}) => {
  if (variant === 'chat-message') {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
          p: 2,
          animation: 'fadeIn 0.3s ease-out',
        }}
      >
        {Array.from({ length: count }).map((_, index) => (
          <Box
            key={index}
            sx={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: 1,
              mb: 2,
            }}
          >
            <Skeleton
              variant="circular"
              width={32}
              height={32}
              animation={animation}
              sx={{
                bgcolor: 'rgba(37, 99, 235, 0.1)',
                '&::after': {
                  background: 'linear-gradient(90deg, transparent, rgba(37, 99, 235, 0.2), transparent)',
                }
              }}
            />
            <Box sx={{ flex: 1 }}>
              <Skeleton
                variant="rectangular"
                width="70%"
                height={40}
                animation={animation}
                sx={{
                  borderRadius: 2,
                  bgcolor: 'rgba(37, 99, 235, 0.05)',
                  '&::after': {
                    background: 'linear-gradient(90deg, transparent, rgba(37, 99, 235, 0.15), transparent)',
                  }
                }}
              />
              <Skeleton
                variant="text"
                width="50%"
                height={20}
                animation={animation}
                sx={{ 
                  mt: 0.5,
                  '&::after': {
                    background: 'linear-gradient(90deg, transparent, rgba(37, 99, 235, 0.1), transparent)',
                  }
                }}
              />
            </Box>
          </Box>
        ))}
      </Box>
    );
  }

  if (variant === 'card') {
    return (
      <Box
        sx={{
          p: 3,
          borderRadius: 2,
          border: '1px solid rgba(37, 99, 235, 0.1)',
          animation: 'cardPulse 2s ease-in-out infinite',
          '@keyframes cardPulse': {
            '0%, 100%': {
              boxShadow: '0 2px 8px rgba(37, 99, 235, 0.1)',
            },
            '50%': {
              boxShadow: '0 4px 16px rgba(37, 99, 235, 0.2)',
            }
          }
        }}
      >
        <Skeleton
          variant="rectangular"
          width="100%"
          height={200}
          animation={animation}
          sx={{
            borderRadius: 1,
            mb: 2,
            bgcolor: 'rgba(37, 99, 235, 0.05)',
            '&::after': {
              background: 'linear-gradient(90deg, transparent, rgba(37, 99, 235, 0.15), transparent)',
            }
          }}
        />
        <Skeleton
          variant="text"
          width="80%"
          height={30}
          animation={animation}
          sx={{ mb: 1 }}
        />
        <Skeleton
          variant="text"
          width="60%"
          height={20}
          animation={animation}
        />
      </Box>
    );
  }

  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <Skeleton
          key={index}
          variant={variant}
          width={width}
          height={height}
          animation={animation}
          sx={{
            mb: variant === 'text' ? 0.5 : 0,
            '&::after': {
              background: 'linear-gradient(90deg, transparent, rgba(37, 99, 235, 0.1), transparent)',
            }
          }}
        />
      ))}
    </>
  );
};

export default LoadingSkeleton;
