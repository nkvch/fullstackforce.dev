import React from 'react';
import { FiUser, FiMonitor, FiCpu, FiDatabase, FiServer, FiLayout } from 'react-icons/fi';
import './ProcessFlowSchema.css';

const TOP_STEPS = [
    { icon: FiUser, title: 'User Authentication', description: 'User logs into the system to gain access', color: '#3b82f6' },
    { icon: FiCpu, title: 'AI Model Processes Screen', description: 'AI model identifies the active system and key value', color: '#22c55e' },
    { icon: FiServer, title: 'BI System Retrieves Data', description: 'BI system retrieves relevant data from its database', color: '#f97316' },
];

const BOTTOM_STEPS = [
    { icon: FiMonitor, title: 'Screen Capture', description: 'System captures the current screen for analysis', color: '#06b6d4' },
    { icon: FiDatabase, title: 'Key Value Sent to BI System', description: 'Key value is sent to the BI system for processing', color: '#eab308' },
    { icon: FiLayout, title: 'Data Displayed', description: 'Retrieved data is displayed in a floating window', color: '#ef4444' },
];

const ARROW_COLORS = ['#3b82f6', '#06b6d4', '#22c55e', '#eab308', '#f97316'];

export default function ProcessFlowSchema() {
    return (
        <div className="process-flow-root">
            <div className="schema-container">
                {/* Top Row - offset to the left */}
                <div className="top-row">
                    {TOP_STEPS.map((step, i) => (
                        <div key={i} className="step-box">
                            <div className="step-icon" style={{ color: step.color }}>
                                <step.icon size={32} strokeWidth={1.5} />
                            </div>
                            <div className="step-title">{step.title}</div>
                            <div className="step-description">{step.description}</div>
                        </div>
                    ))}
                </div>

                {/* Arrow Row */}
                <div className="arrow-row">
                    <svg className="arrow-line" viewBox="0 0 1000 50" preserveAspectRatio="none">
                        {ARROW_COLORS.map((color, i) => {
                            const startX = i * 200;
                            return (
                                <g key={i}>
                                    <circle cx={startX + 20} cy="25" r="5" fill={color} />
                                    <circle cx={startX + 40} cy="25" r="5" fill={color} />
                                    <circle cx={startX + 60} cy="25" r="5" fill={color} />
                                    <circle cx={startX + 80} cy="25" r="5" fill={color} />
                                    <path
                                        d={`M${startX + 100} 25 L${startX + 160} 25 M${startX + 145} 12 L${startX + 170} 25 L${startX + 145} 38`}
                                        stroke={color}
                                        strokeWidth="4"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        fill="none"
                                    />
                                </g>
                            );
                        })}
                    </svg>
                </div>

                {/* Bottom Row - offset to the right */}
                <div className="bottom-row">
                    {BOTTOM_STEPS.map((step, i) => (
                        <div key={i} className="step-box">
                            <div className="step-icon" style={{ color: step.color }}>
                                <step.icon size={32} strokeWidth={1.5} />
                            </div>
                            <div className="step-title">{step.title}</div>
                            <div className="step-description">{step.description}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
