'use client';

import { useEffect } from 'react';

export default function CustomCursor() {
    useEffect(() => {
        const dot = document.getElementById('cursorDot');
        const label = document.getElementById('cursorLabel');
        if (!dot || !label) return;

        let cx = 0, cy = 0;
        let animationFrameId: number;

        const onMouseMove = (e: MouseEvent) => {
            cx = e.clientX;
            cy = e.clientY;
        };
        document.addEventListener('mousemove', onMouseMove);

        const cursorLoop = () => {
            dot.style.left = cx - 4 + 'px';
            dot.style.top = cy - 4 + 'px';
            animationFrameId = requestAnimationFrame(cursorLoop);
        };
        cursorLoop();

        let isDrag = false;

        const setMode = (mode: string) => {
            dot.className = 'cursor-dot' + (mode ? ' mode-' + mode : '');
        };
        const clearMode = () => {
            dot.className = 'cursor-dot';
        };
        const showLabel = (text: string) => {
            if(label) label.textContent = text;
            dot.classList.add('show-label');
        };
        const hideLabel = () => {
            dot.classList.remove('show-label');
        };

        const onClick = (e: MouseEvent) => {
            const r = document.createElement('div');
            r.className = 'cursor-ripple';
            r.style.left = e.clientX + 'px';
            r.style.top = e.clientY + 'px';
            r.style.width = '0';
            r.style.height = '0';
            document.body.appendChild(r);
            requestAnimationFrame(() => {
                r.style.width = '160px';
                r.style.height = '160px';
                r.style.transition = 'all .4s ease-out';
                r.style.opacity = '0';
            });
            setTimeout(() => { r.remove(); }, 450);
        };
        document.addEventListener('click', onClick);

        // Bind global hover detection based on data attributes or tags
        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const interactive = target.closest('a, button, [data-mode], [data-cursor]');
            if (interactive) {
                const mode = interactive.getAttribute('data-mode') || 'hover';
                if (mode === 'drag') {
                    // drag handles mousedown
                } else if (mode === 'label' || interactive.hasAttribute('data-cursor')) {
                    setMode('hover');
                    const text = interactive.getAttribute('data-cursor') || interactive.getAttribute('data-label') || 'EXPLORE';
                    showLabel(text);
                } else {
                    setMode('hover');
                    hideLabel();
                }
            }
        };

        const handleMouseOut = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const interactive = target.closest('a, button, [data-mode], [data-cursor]');
            if (interactive) {
                clearMode();
                hideLabel();
            }
        };

        const onMouseDown = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (target.closest('[data-mode="drag"]')) {
                isDrag = true;
                setMode('drag');
            }
        };
        
        const onMouseUp = () => {
            if (isDrag) {
                isDrag = false;
                clearMode();
            }
        };

        document.addEventListener('mouseover', handleMouseOver);
        document.addEventListener('mouseout', handleMouseOut);
        document.addEventListener('mousedown', onMouseDown);
        document.addEventListener('mouseup', onMouseUp);

        return () => {
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('click', onClick);
            document.removeEventListener('mouseover', handleMouseOver);
            document.removeEventListener('mouseout', handleMouseOut);
            document.removeEventListener('mousedown', onMouseDown);
            document.removeEventListener('mouseup', onMouseUp);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <>
            <style dangerouslySetInnerHTML={{ __html: `
                .cursor-dot {
                    width: 8px; height: 8px;
                    background: linear-gradient(135deg, #007BFF, #00C6FF);
                    border-radius: 50%;
                    position: fixed;
                    pointer-events: none;
                    z-index: 10001;
                    box-shadow: 0 0 8px #00C6FF, 0 0 20px rgba(0,198,255,.25), 0 0 40px rgba(0,198,255,.08);
                    transition: width .2s cubic-bezier(.22,1,.36,1), height .2s cubic-bezier(.22,1,.36,1), background .2s, box-shadow .2s, margin .2s;
                    transform: translate(-50%, -50%);
                }

                .cursor-dot.mode-drag {
                    width: 10px; height: 10px;
                    background: #ff6b35;
                    box-shadow: 0 0 8px #ff6b35, 0 0 20px rgba(255,107,53,.25);
                }
                .cursor-label {
                    position: absolute;
                    left: 52px; top: 50%;
                    transform: translateY(-50%);
                    font-family: var(--font-orbitron, 'Orbitron', sans-serif);
                    font-size: .5rem;
                    letter-spacing: 2px;
                    color: #00C6FF;
                    opacity: 0;
                    transition: opacity .2s;
                    white-space: nowrap;
                    text-transform: uppercase;
                    pointer-events: none;
                }
                .cursor-dot.show-label .cursor-label { opacity: .7; }
                .cursor-ripple {
                    position: fixed;
                    border-radius: 50%;
                    background: radial-gradient(circle, rgba(0,198,255,.15), transparent 70%);
                    transform: translate(-50%,-50%);
                    pointer-events: none;
                    z-index: 9999;
                }
                @media (max-width: 768px) {
                    .cursor-dot, .cursor-ripple { display: none !important; }
                }
            `}} />
            <div className="cursor-dot" id="cursorDot">
                <div className="cursor-label" id="cursorLabel">EXPLORE</div>
            </div>
        </>
    );
}
