// File: pages/index.js
"use client"
import React, { useState, useEffect } from 'react';

// The component is named FacebookPage as per your file comments.
const FacebookPage = () => {
  const [postContent, setPostContent] = useState('');
  const [scheduledTime, setScheduledTime] = useState('');
  const [imageFiles, setImageFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  
  // State for multiple selected groups, initialized as an empty array.
  const [selectedGroups, setSelectedGroups] = useState([]);
  
  const [status, setStatus] = useState('');
  const [isScheduling, setIsScheduling] = useState(false);

  // New state to hold the list of scheduled posts and their loading status.
  const [scheduledPosts, setScheduledPosts] = useState([]);
  const [isLoadingPosts, setIsLoadingPosts] = useState(true);

  // Dynamic state for the list of groups
  const [groups, setGroups] = useState([
    { id: '1234567890', name: 'My Photography Group' },
    { id: '0987654321', name: 'Local Community Hub' },
    { id: '1122334455', name: 'React Developers' },
    { id: '1112223334', name: 'Vintage Car Enthusiasts' },
    { id: '5556667778', name: 'Hiking Adventures Club' },
    { id: '9998887776', name: 'Gardening Tips & Tricks' },
    { id: '4443332221', name: 'Coding for Beginners' },
    { id: '6665554443', name: 'Pet Lovers Worldwide' },
    { id: '8889990001', name: 'Bookworms Unite' },
    { id: '1213141516', name: 'Travel Destinations' },
  ]);

  // State for the new group input field
  const [newGroupInput, setNewGroupInput] = useState('');

  // A helper function to fetch the scheduled posts from a real API.
  const fetchScheduledPosts = async () => {
    setIsLoadingPosts(true);
    setStatus('');
    try {
      // NOTE: Reverting to a relative path. For a Next.js app, this is the correct
      // way to reference an API route in the same project. The 404 error suggests
      // the API route is not accessible at the specified URL.
      const response = await fetch('/api/scheduled-posts');
      if (!response.ok) {
        throw new Error(`API error: ${response.status} - ${response.statusText}`);
      }
      const data = await response.json();
      // Assuming the API returns an object with a 'posts' key
      setScheduledPosts(data.posts);
    } catch (error) {
      console.error('Error fetching scheduled posts:', error);
      setStatus(`Failed to load scheduled posts: ${error.message}`);
      setScheduledPosts([]); // Set to empty array on failure.
    } finally {
      setIsLoadingPosts(false);
    }
  };

  // The useEffect hook runs once when the component mounts to fetch posts.
  useEffect(() => {
    fetchScheduledPosts();
  }, []);

  // Handle file selection and create a preview URL for each file.
  const handleImageChange = (e) => {
    if (e.target && e.target.files) {
      const files = Array.from(e.target.files);

      // Clean up old object URLs to prevent memory leaks.
      imagePreviews.forEach(URL.revokeObjectURL);

      if (files.length > 0) {
        setImageFiles(files);
        const previews = files.map(file => URL.createObjectURL(file));
        setImagePreviews(previews);
      } else {
        setImageFiles([]);
        setImagePreviews([]);
      }
    }
  };
  
  // Handle checkbox changes for groups.
  const handleGroupChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      // Add the group ID to the array.
      setSelectedGroups(prev => [...prev, value]);
    } else {
      // Remove the group ID from the array.
      setSelectedGroups(prev => prev.filter(groupId => groupId !== value));
    }
  };

  // Function to handle adding a new group
  const handleAddGroup = (e) => {
    e.preventDefault();
    if (newGroupInput.trim() !== '') {
      let newGroup = null;
      // Check if the input is a URL
      if (newGroupInput.startsWith('http')) {
        try {
          const url = new URL(newGroupInput);
          const pathParts = url.pathname.split('/').filter(Boolean);
          if (pathParts[0] === 'groups' && pathParts[1]) {
            const extractedId = pathParts[1];
            // Format the name nicely
            const extractedName = extractedId
              .split('-')
              .map(word => word.charAt(0).toUpperCase() + word.slice(1))
              .join(' ');

            newGroup = {
              id: extractedId,
              name: extractedName,
            };
          }
        } catch (error) {
          // If URL parsing fails, we'll treat it as a regular name
          console.error("Invalid URL, treating as group name.", error);
        }
      }

      // If it's not a valid URL or the parsing failed, treat it as a regular group name
      if (!newGroup) {
        newGroup = {
          id: Date.now().toString(), // Generate a unique ID for a simple name
          name: newGroupInput.trim(),
        };
      }
      
      setGroups(prevGroups => [...prevGroups, newGroup]);
      setNewGroupInput(''); // Clear the input field
    }
  };

  // Function to handle the form submission.
  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus('');

    if (!postContent.trim() || !scheduledTime || selectedGroups.length === 0) {
      setStatus('Please enter post content, a scheduled date/time, and select at least one group.');
      return;
    }

    setIsScheduling(true);
    
    // We now use FormData to send the data, which is required for file uploads.
    const formData = new FormData();
    formData.append('postContent', postContent);
    formData.append('scheduledTime', scheduledTime);
    // Append each image file to the form data.
    imageFiles.forEach(file => {
      formData.append('images', file);
    });

    try {
      // NOTE: Reverting to a relative path.
      const response = await fetch('/api/schedule-post', {
        method: 'POST',
        // NOTE: No 'Content-Type' header is needed here. The browser sets it
        // automatically for FormData, including the boundary.
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();
      
      // Re-fetch the posts to get the latest list from the API.
      fetchScheduledPosts();

      setStatus(`Post scheduled successfully! Post ID: ${data.postId}`);
      
      // Reset the form fields.
      setPostContent('');
      setScheduledTime('');
      setImageFiles([]);
      setImagePreviews([]);
      setSelectedGroups([]);
    } catch (error) {
      console.error('Scheduling error:', error);
      setStatus(`An error occurred during scheduling: ${error.message}`);
    } finally {
      setIsScheduling(false);
    }
  };

  // New function to handle post cancellation
  const handleCancelPost = (postId) => {
    // NOTE: This should also make an API call to delete the post from your backend.
    setScheduledPosts(prevPosts => prevPosts.filter(post => post.id !== postId));
    setStatus(`Post with ID ${postId} has been cancelled.`);
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
        <div className="w-full max-w-2xl p-8 bg-white rounded-3xl shadow-2xl">
          
          {/* Header */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <span className="text-blue-600 text-5xl">📘</span>
            <h1 className="text-4xl font-extrabold text-gray-800">Facebook Post Scheduler</h1>
          </div>
          
          <hr className="my-10 border-gray-200" />
          
          {/* Section to Create a New Post */}
          <div className="mb-10">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Schedule a New Post</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Add New Group Section */}
              <div className="p-4 bg-gray-50 border border-gray-300 rounded-xl">
                <label className="block text-gray-700 font-semibold mb-2">
                  <span className="inline-block mr-2 text-gray-500">➕</span>
                  Add a New Group
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={newGroupInput}
                    onChange={(e) => setNewGroupInput(e.target.value)}
                    placeholder="Enter group name or URL..."
                    className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    onClick={handleAddGroup}
                    type="button" // Use type="button" to prevent form submission
                    className="flex-shrink-0 bg-blue-600 text-white font-bold py-3 px-6 rounded-xl shadow-md hover:bg-blue-700 transition-colors"
                    disabled={newGroupInput.trim() === ''}
                  >
                    Add
                  </button>
                </div>
              </div>

              {/* Group Selection (as a checklist) */}
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  <span className="inline-block mr-2 text-gray-500">👥</span>
                  Select Groups (up to 10)
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 bg-gray-50 border border-gray-300 rounded-xl">
                  {groups.map((group) => (
                    <label key={group.id} className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        value={group.id}
                        checked={selectedGroups.includes(group.id)}
                        onChange={handleGroupChange}
                        className="form-checkbox h-5 w-5 text-blue-600 rounded-md"
                        disabled={isScheduling}
                      />
                      <a 
                        href={`https://www.facebook.com/groups/${group.id}`} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-gray-700 hover:text-blue-600 hover:underline"
                      >
                        {group.name}
                      </a>
                    </label>
                  ))}
                </div>
              </div>

              {/* Post Content Input */}
              <div>
                <label htmlFor="postContent" className="block text-gray-700 font-semibold mb-2">
                  Post Content
                </label>
                <textarea
                  id="postContent"
                  className="w-full p-4 border border-gray-300 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows="6"
                  value={postContent}
                  onChange={(e) => setPostContent(e.target.value)}
                  placeholder="What's on your mind?..."
                  disabled={isScheduling}
                ></textarea>
              </div>

              {/* Image Upload */}
              <div>
                <label htmlFor="imageUpload" className="block text-gray-700 font-semibold mb-2">
                  <span className="inline-block mr-2 text-gray-500">🖼️</span>
                  Add Image(s) (Optional)
                </label>
                <input
                  type="file"
                  id="imageUpload"
                  accept="image/*"
                  className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  onChange={handleImageChange}
                  disabled={isScheduling}
                  multiple // This attribute is key for selecting multiple files
                />
                {/* Image Previews */}
                {imagePreviews.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-4 justify-center">
                    {imagePreviews.map((previewUrl, index) => (
                      <img key={index} src={previewUrl} alt={`Image Preview ${index + 1}`} className="max-w-xs h-auto rounded-xl shadow-md" />
                    ))}
                  </div>
                )}
              </div>

              {/* Scheduled Time Input */}
              <div>
                <label htmlFor="scheduledTime" className="block text-gray-700 font-semibold mb-2">
                  <span className="inline-block mr-2 text-gray-500">📅</span>
                  Schedule Date and Time
                </label>
                <input
                  type="datetime-local"
                  id="scheduledTime"
                  className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={scheduledTime}
                  onChange={(e) => setScheduledTime(e.target.value)}
                  disabled={isScheduling}
                />
              </div>

              {/* Submission Button */}
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white font-bold py-3 px-6 rounded-xl shadow-lg hover:bg-blue-700 transition-colors disabled:bg-blue-300"
                disabled={isScheduling}
              >
                {isScheduling ? (
                  <>
                    <span className="animate-spin">🔄</span>
                    Scheduling...
                  </>
                ) : (
                  'Schedule Post'
                )}
              </button>
            </form>

            {/* Status Message */}
            {status && (
              <div className={`mt-6 p-4 text-center rounded-xl font-medium ${status.includes('successfully') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                {status}
              </div>
            )}
          </div>
          
          <hr className="my-10 border-gray-200" />

          {/* New Section to Display Scheduled Posts */}
          <div className="mt-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">Scheduled Posts</h2>
            {isLoadingPosts ? (
              <div className="flex justify-center items-center h-48 text-gray-500">
                <span className="animate-spin text-4xl">🔄</span>
                <span className="ml-4">Loading posts...</span>
              </div>
            ) : !Array.isArray(scheduledPosts) || scheduledPosts.length === 0 ? (
              <p className="text-center text-gray-500">No scheduled posts found.</p>
            ) : (
              <ul className="space-y-6">
                {scheduledPosts.map((post) => (
                  <li key={post.id} className="p-6 bg-gray-50 rounded-2xl shadow-sm border border-gray-200">
                    <p className="text-gray-900 font-medium mb-2">{post.message}</p>
                    <div className="flex justify-between items-center text-sm text-gray-500">
                      <div>
                        {post.isPublished ? (
                          // If the post is published, show a link to the post.
                          <p className="flex items-center">
                            <span className="font-semibold text-green-600">Published! ✅</span>
                            <a href={post.publishedLink} target="_blank" rel="noopener noreferrer" className="ml-2 text-blue-600 hover:underline">
                              View Post
                            </a>
                          </p>
                        ) : (
                          // If the post is scheduled, show the scheduled time.
                          <p>
                            Scheduled for: 
                            <span className="font-semibold ml-2">
                              {new Date(post.scheduled_publish_time * 1000).toLocaleString()}
                            </span>
                          </p>
                        )}
                        <p className="mt-1">
                          Post created: 
                          <span className="ml-2">
                            {new Date(post.created_time).toLocaleString()}
                          </span>
                        </p>
                      </div>
                      {/* New Cancel button, only visible for unpublished posts */}
                      {!post.isPublished && (
                        <button
                          onClick={() => handleCancelPost(post.id)}
                          className="bg-red-500 text-white font-bold py-2 px-4 rounded-xl shadow-md hover:bg-red-600 transition-colors"
                        >
                          Cancel Post
                        </button>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default FacebookPage;
