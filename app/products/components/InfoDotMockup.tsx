import React from 'react';
import './InfoDotMockup.css';

export default function InfoDotMockup() {
    return (
        <div className="infodot-mockup-root">
            <div className="infodot-wrapper">
                <div className="patient-card">
                    <div className="card-header">
                        <div className="patient-info">
                            <h2>Israel Israeli</h2>
                            <div className="patient-id">
                                Patient ID <span className="id-badge">123456</span>
                            </div>
                        </div>
                        <div
                            style={{
                                width: '40px',
                                height: '40px',
                                background: '#e2e8f0',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontWeight: 'bold',
                                color: '#64748b',
                            }}
                        >
                            II
                        </div>
                    </div>

                    <div className="card-body">
                        <div>
                            <span className="section-label">Current Diagnosis</span>
                            <div className="diagnosis-text">Heart failure (Stage C)</div>
                        </div>

                        <div>
                            <span className="section-label" style={{ color: '#e11d48' }}>
                                Critical Allergies
                            </span>
                            <div className="allergies-grid">
                                <span className="allergy-chip">Penicillin</span>
                                <span className="allergy-chip">Atorvastatin</span>
                                <span className="allergy-chip">Milk</span>
                            </div>
                        </div>
                    </div>

                    <div className="card-footer">
                        <span className="source-tag">Source: Hospital EMR • via InfoDot</span>
                        <span className="footer-link">View Full Profile →</span>
                    </div>
                </div>

                <div className="orb-button-container">
                    <img
                        src="/blue_dot.png"
                        alt="InfoDot"
                        className="orb-image"
                    />
                </div>
            </div>
        </div>
    );
}
