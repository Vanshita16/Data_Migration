import React, { useState } from 'react';
import MonacoEditor from "@monaco-editor/react";
import { Octokit } from '@octokit/rest';
import axios from 'axios';

const GitIntegration = () => {
  const [repoName, setRepoName] = useState('');
  const [code, setCode] = useState('// type your code here');
  const [filePath, setFilePath] = useState('index.js');
  const [commitMessage, setCommitMessage] = useState('Initial commit');
  const [token, setToken] = useState(''); // GitHub personal access token

  const octokit = new Octokit({
    auth: token
  });

  const createRepo = async () => {
    try {
      const response = await octokit.repos.createForAuthenticatedUser({
        name: repoName,
        private: false
      });
      console.log('Repository created:', response.data);
    } catch (error) {
      console.error('Error creating repository:', error);
    }
  };

  const saveCode = async () => {
    try {
      const response = await octokit.repos.createOrUpdateFileContents({
        owner: 'YOUR_GITHUB_USERNAME', // Replace with your GitHub username
        repo: repoName,
        path: filePath,
        message: commitMessage,
        content: btoa(code), // Use btoa to encode code content to Base64
      });
      console.log('Code saved:', response.data);
    } catch (error) {
      console.error('Error saving code:', error);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={token}
        onChange={(e) => setToken(e.target.value)}
        placeholder="GitHub Token"
      />
      <input
        type="text"
        value={repoName}
        onChange={(e) => setRepoName(e.target.value)}
        placeholder="Repository Name"
      />
      <button onClick={createRepo}>Create Repository</button>

      <MonacoEditor
         height="90vh"
        language="javascript"
        theme="vs-dark"
        value={code}
        onChange={(newValue) => setCode(newValue)}
      />

      <input
        type="text"
        value={filePath}
        onChange={(e) => setFilePath(e.target.value)}
        placeholder="File Path"
      />
      <input
        type="text"
        value={commitMessage}
        onChange={(e) => setCommitMessage(e.target.value)}
        placeholder="Commit Message"
      />
      <button onClick={saveCode}>Save Code to GitHub</button>
    </div>
  );
}

export default GitIntegration;
