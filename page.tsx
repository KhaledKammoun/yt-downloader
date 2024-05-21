'use client'
import { useState } from 'react';

const YouTubeDownloader = () => {
  const [downloadType, setDownloadType] = useState(1);
  const [url, setUrl] = useState('');
  const [customUrls, setCustomUrls] = useState('');

  const handleDownloadTypeChange = (event) => {
    setDownloadType(parseInt(event.target.value));
  };

  const handleUrlChange = (event) => {
    setUrl(event.target.value);
  };

  const handleCustomUrlsChange = (event) => {
    setCustomUrls(event.target.value);
  };
  const SubmitButton = () => {
    return (
      <button className='flex flex-row mt-5 items-center justify-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'>
        <svg className="mr-2" height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h24v24H0z" fill="none"></path><path d="M1 14.5a6.496 6.496 0 0 1 3.064-5.519 8.001 8.001 0 0 1 15.872 0 6.5 6.5 0 0 1-2.936 12L7 21c-3.356-.274-6-3.078-6-6.5zm15.848 4.487a4.5 4.5 0 0 0 2.03-8.309l-.807-.503-.12-.942a6.001 6.001 0 0 0-11.903 0l-.12.942-.805.503a4.5 4.5 0 0 0 2.029 8.309l.173.013h9.35l.173-.013zM13 12h3l-4 5-4-5h3V8h2v4z" fill="currentColor"></path></svg>
        <span>Download</span>
      </button>
    )
  }
  const renderInputBasedOnType = () => {
    switch (downloadType) {
      case 1:
        return (
          <div className="relative flex flex-row">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                </svg>
            </div>
            <input               
              id="playlist_url"
              name="playlist_url"
              placeholder="Enter the Playlist URL"
              value={url}
              onChange={handleUrlChange} type="text" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
            <SubmitButton />
        </div>

        );
      case 2:
        return (

        <div className="relative flex flex-row">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
              </svg>
          </div>
          <input               
            id="video_url"
            name="video_url"
            placeholder="Enter the Video URL"
            value={url}
            onChange={handleUrlChange} type="text" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
          <SubmitButton />
      </div>
        );
      case 3:
        return (
          <div className="form-group">
            <label htmlFor="custom_playlist">
              Enter video URLs (one per line):
            </label>
            <textarea
              className="form-control"
              rows={5}
              id="custom_playlist"
              name="custom_playlist"
              placeholder="Paste or enter video URLs here"
              value={customUrls}
              onChange={handleCustomUrlsChange}
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className=" p-1 text-white  h-screen antialiased bg-gray-50 dark:bg-gray-900 flex flex-col items-center justify-center">
      <h2 className=" m-28 text-5xl font-extrabold ">YouTube Downloader</h2>
      <form method="post" className=' flex flex-col justify-center items-center'>
        <div className="form-group">
          <div className='mb-2 flex flex-row items-center justify-center'>
            <label htmlFor="desition" className='block w-96 text-lg font-medium text-gray-900 dark:text-white'>Select Download Type:</label>
            <select 
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              id="desition"
              name="desition"
              value={downloadType}
              onChange={handleDownloadTypeChange}
            >
              <option value={1}>Download Playlist</option>
              <option value={2}>Download Video</option>
              <option value={3}>Custom Playlist</option>
            </select>
          </div>
        </div>
        {renderInputBasedOnType()}

      </form>
    </div>
  );
};

export default YouTubeDownloader;
