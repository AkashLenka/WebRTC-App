import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import Join from './components/Join/Join.js';
import Chat from './components/Chat/Chat.js';

const App=()=>{
    return(
    <Router>
        <Routes>
            <Route path="/" element={<Join />} />
            <Route path="/chat" element={<Chat />} />
        </Routes>
    </Router>
    );
};

export default App;