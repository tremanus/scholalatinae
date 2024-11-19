import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const url = new URL(request.url);
    const searchQuery = url.searchParams.get('searchQuery') || '';
    const filter = url.searchParams.get('filter') || 'all';
    const channelId = 'UCysamLc95mPEobVR6Mbhhcg';
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&maxResults=50&order=date&type=video&key=${process.env.YOUTUBE_API_KEY}`
    );

    const data = await response.json();
    
    if (data.error) {
      console.error('YouTube API Error:', data.error);
      return NextResponse.json(
        { error: data.error.message },
        { status: 500 }
      );
    }

    let videoList = data.items.map((item) => {
      // Check if title contains keywords like latin, greek, or etymology
      const title = item.snippet.title.toLowerCase();
      const playlistCategory = /latin|etymology/.test(title) ? 'language' : 'civilization'; // Assign playlist category based on title content

      return {
        title: item.snippet.title,
        description: item.snippet.description,
        videoId: item.id.videoId,
        thumbnail: item.snippet.thumbnails.high.url,
        publishedAt: new Date(item.snippet.publishedAt),
        playlist: playlistCategory, // Add playlist category
      };
    });

    // Filter out video with title "Welcome to ScholaLatinae!"
    videoList = videoList.filter((video) => video.title !== "Welcome to ScholaLatinae!");

    // Apply search filter
    if (searchQuery) {
      videoList = videoList.filter(
        (video) =>
          video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          video.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply filter (language/civilization)
    if (filter !== 'all') {
      videoList = videoList.filter((video) => video.playlist === filter);
    }

    // Sort videos by published date
    videoList.sort((a, b) => b.publishedAt - a.publishedAt);

    return NextResponse.json(videoList);

  } catch (error) {
    console.error('Server Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch videos' },
      { status: 500 }
    );
  }
}
