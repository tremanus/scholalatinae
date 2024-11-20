'use client';
import React, { useState, useEffect } from 'react';
import {
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  TextField,
  CircularProgress,
  Alert,
  Button,
  ButtonGroup,
} from '@mui/material';
import Dashboard from '@/src/components/sidebar';

export default function Lessons() {
  const [videos, setVideos] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all'); // 'all', 'language', 'civilization'
  const [selectedVideo, setSelectedVideo] = useState(null); // State for the enlarged video

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`/api/youtube?searchQuery=${searchQuery}&filter=${filter}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Failed to fetch videos');
        }

        setVideos(data);
      } catch (error) {
        console.error('Error fetching YouTube videos:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, [searchQuery, filter]);

  const handleSearch = () => {
    setSearchQuery(searchQuery.trim());
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  return (
    <Dashboard>
      <Box sx={{ py: 4, px: 2, maxWidth: 1200, mx: 'auto', position: 'relative' }}>
        <Typography variant="h4" align="center" sx={{ fontWeight: '600' }} gutterBottom>
          Lessons
        </Typography>
  
        <Typography variant="body1" align="center" sx={{ color: 'text.secondary', mb: 4 }}>
          Explore our curated lessons designed to bring the Latin language and Roman culture to life.
        </Typography>
  
        <Grid container spacing={2} alignItems="center" justifyContent="center" mb={4}>
          <Grid item xs={12} sm={8} md={6}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Search lessons..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSearch();
              }}
              InputProps={{
                startAdornment: <i className="fas fa-search" style={{ color: '#888', marginRight: 8 }} />,
              }}
            />
          </Grid>
  
          <Grid item>
            <ButtonGroup variant="outlined">
              <Button
                variant={filter === 'all' ? 'contained' : 'outlined'}
                onClick={() => handleFilterChange('all')}
              >
                All
              </Button>
              <Button
                variant={filter === 'language' ? 'contained' : 'outlined'}
                onClick={() => handleFilterChange('language')}
              >
                Language
              </Button>
              <Button
                variant={filter === 'civilization' ? 'contained' : 'outlined'}
                onClick={() => handleFilterChange('civilization')}
              >
                Civilization
              </Button>
            </ButtonGroup>
          </Grid>
        </Grid>
  
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
            <CircularProgress />
          </Box>
        ) : (
          <Grid container spacing={3}>
            {videos.map((video) => (
              <Grid item xs={12} sm={6} key={video.videoId}>
                <Card
                  sx={{
                    height: '100%',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    '&:hover': {
                      transform: 'scale(1.02)',
                      boxShadow: 3,
                    },
                    cursor: 'pointer',
                  }}
                  onClick={() => setSelectedVideo(video)}
                >
                  {/* Display the thumbnail first */}
                  <CardMedia
                    component="img"
                    image={video.thumbnail}
                    alt={video.title}
                    sx={{
                      width: '100%',
                      height: 0,
                      paddingTop: '56.25%', // 16:9 Aspect Ratio
                    }}
                  />
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {video.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      sx={{
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      }}
                    >
                      {video.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
  
        {!loading && videos.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography variant="body1" color="textSecondary">
              No videos found matching your search.
            </Typography>
          </Box>
        )}
  
        {selectedVideo && (
          <Box
            sx={{
              position: 'fixed',
              top: '40px',
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              backdropFilter: 'blur(5px)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: 1200,
            }}
            onClick={() => setSelectedVideo(null)} // Close on background click
          >
            <Box
              sx={{
                width: '90%',
                height: '90%',
                backgroundColor: 'background.paper',
                borderRadius: 2,
                overflow: 'hidden',
                boxShadow: 5,
                position: 'relative',
              }}
            >
              <iframe
                src={`https://www.youtube.com/embed/${selectedVideo.videoId}`}
                title={selectedVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{
                  width: '100%',
                  height: '100%',
                }}
              />
            </Box>
          </Box>
        )}
      </Box>
    </Dashboard>
  );
}
