// src/pages/FilesPage.jsx
import React from 'react';
import FileUpload from '../components/FileUpload';

function FilesPage() {
  return (
    <div className="files-page">
      <h1 className="page-title">Banking Documents</h1>
      <p className="page-description">
        Upload and manage your banking documents, policies, and procedures. The Banking Assistant will use these documents to provide accurate information about our services, policies, and procedures.
      </p>
      <div className="document-types">
        <div className="document-type">
          <h3>📄 Policy Documents</h3>
          <p>Banking policies, terms and conditions, and regulatory documents</p>
        </div>
        <div className="document-type">
          <h3>📋 Procedure Manuals</h3>
          <p>Step-by-step guides for banking operations and services</p>
        </div>
        <div className="document-type">
          <h3>📑 Service Information</h3>
          <p>Details about banking products, services, and features</p>
        </div>
      </div>
      <FileUpload />
    </div>
  );
}

export default FilesPage;