import React from 'react';
import './InfoDotDiagram.css';

export default function InfoDotDiagram() {
    return (
        <div className="infodot-diagram-root">
            <div className="diagram-stage">
                {/* connector lines */}
                <svg className="diagram-links" viewBox="0 0 1000 420" preserveAspectRatio="none" aria-hidden="true">
                    <defs>
                        <linearGradient id="linkGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#06b6d4" />
                            <stop offset="100%" stopColor="#2563eb" />
                        </linearGradient>
                        <marker id="ah" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="9" markerHeight="9" orient="auto">
                            <path d="M 0 0 L 10 5 L 0 10 z" fill="#2563eb" />
                        </marker>
                    </defs>

                    {/* glow underlay */}
                    <path className="linkGlow" d="M 315 78 C 380 90, 400 100, 420 120" />
                    <path className="linkGlow" d="M 315 342 C 380 330, 400 320, 420 300" />
                    <path className="linkGlow" d="M 685 74 C 620 85, 600 95, 580 120" />
                    <path className="linkGlow" d="M 705 205 C 650 210, 620 212, 590 212" />
                    <path className="linkGlow" d="M 700 340 C 640 330, 610 315, 580 295" />

                    {/* main lines */}
                    <path className="link" markerEnd="url(#ah)" d="M 315 78 C 380 90, 400 100, 420 120" />
                    <path className="link" markerEnd="url(#ah)" d="M 315 342 C 380 330, 400 320, 420 300" />
                    <path className="link" markerEnd="url(#ah)" d="M 685 74 C 620 85, 600 95, 580 120" />
                    <path className="link" markerEnd="url(#ah)" d="M 705 205 C 650 210, 620 212, 590 212" />
                    <path className="link" markerEnd="url(#ah)" d="M 700 340 C 640 330, 610 315, 580 295" />
                </svg>

                {/* cards */}
                <div className="diagram-card c-settings">
                    <div className="diagram-badge"><span className="dotmini"></span>Control</div>
                    <h3>Settings access</h3>
                    <p>Open configuration and device preferences.</p>
                </div>

                <div className="diagram-card c-summary">
                    <div className="diagram-badge"><span className="dotmini"></span>Info</div>
                    <h3>Summary display</h3>
                    <p>Show a quick readout of the latest captured details.</p>
                </div>

                <div className="diagram-card c-stop">
                    <div className="diagram-badge"><span className="dotmini"></span>Capture</div>
                    <h3>Stop automatic captures</h3>
                    <p>Pause background screen capture activity instantly.</p>
                </div>

                <div className="diagram-card c-manual">
                    <div className="diagram-badge"><span className="dotmini"></span>Capture</div>
                    <h3>Manual screen capture</h3>
                    <p>Trigger a single capture on demand.</p>
                </div>

                <div className="diagram-card c-role">
                    <div className="diagram-badge"><span className="dotmini"></span>Mode</div>
                    <h3>Role switching</h3>
                    <p>Swap operating modes to match the current task.</p>
                </div>

                {/* center */}
                <div className="diagram-center">
                    <img
                        src="/blue_dot.png"
                        alt="InfoDot"
                        className="diagram-dot-image"
                    />

                    {/*<div className="diagram-keypill">
                        <div className="k">Key Value</div>
                        <div className="v">123456</div>
                    </div>*/}
                </div>
            </div>
        </div>
    );
}
