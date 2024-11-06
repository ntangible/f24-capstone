// src/pages/AddPurchase.js
import React from 'react';
import Sidebar from '../components/Sidebar';

const AddPurchase = () => (
    <div style={{ display: 'flex' }}>
        <Sidebar />
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#1a1c2c', color: '#79c2c2' }}>
            <div style={{ width: '320px', textAlign: 'center' }}>
                <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>Add a New Purchase</h1>
                <form style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    <input 
                        type="text" 
                        placeholder="Item Name" 
                        style={{
                            padding: '10px',
                            borderRadius: '5px',
                            border: 'none',
                            fontSize: '16px',
                            outline: 'none',
                        }}
                        required 
                    />
                    <input 
                        type="number" 
                        placeholder="Amount" 
                        style={{
                            padding: '10px',
                            borderRadius: '5px',
                            border: 'none',
                            fontSize: '16px',
                            outline: 'none',
                        }}
                        required 
                    />
                    <input 
                        type="text" 
                        placeholder="Merchant" 
                        style={{
                            padding: '10px',
                            borderRadius: '5px',
                            border: 'none',
                            fontSize: '16px',
                            outline: 'none',
                        }}
                        required 
                    />
                    <input 
                        type="text" 
                        placeholder="Category" 
                        style={{
                            padding: '10px',
                            borderRadius: '5px',
                            border: 'none',
                            fontSize: '16px',
                            outline: 'none',
                        }}
                        required 
                    />
                    <input 
                        type="date" 
                        style={{
                            padding: '10px',
                            borderRadius: '5px',
                            border: 'none',
                            fontSize: '16px',
                            outline: 'none',
                        }}
                        required 
                    />
                    <button 
                        type="submit" 
                        style={{
                            padding: '10px',
                            borderRadius: '5px',
                            border: 'none',
                            backgroundColor: '#4bb9b9',
                            color: 'white',
                            fontSize: '16px',
                            cursor: 'pointer',
                            fontWeight: 'bold'
                        }}
                    >
                        Add Purchase
                    </button>
                </form>
            </div>
        </div>
    </div>
);

export default AddPurchase;
