'use client';

import { useState, useEffect, useRef, MouseEvent, TouchEvent } from 'react';
import { ZoomIn, ZoomOut, Check, X, Move } from 'lucide-react';

interface ImageCropperModalProps {
  imageSrc: string; // Base64 or Object URL of the source image
  aspect: '1:1' | '3:4' | '4:3' | '16:9' | '16:10';
  onCrop: (croppedDataUrl: string) => void;
  onCancel: () => void;
}

export default function ImageCropperModal({ imageSrc, aspect, onCrop, onCancel }: ImageCropperModalProps) {
  const [zoom, setZoom] = useState(1.0);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [imageSize, setImageSize] = useState({ naturalWidth: 0, naturalHeight: 0 });
  const [initialScaleSize, setInitialScaleSize] = useState({ width: 0, height: 0 });
  
  const imageRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Viewport dimensions based on aspect ratio (fit within comfortable limits)
  let viewportWidth = 320;
  let viewportHeight = 320;
  let aspectName = 'Square (1:1)';

  if (aspect === '3:4') {
    viewportWidth = 300;
    viewportHeight = 400;
    aspectName = 'Portrait (3:4)';
  } else if (aspect === '4:3') {
    viewportWidth = 400;
    viewportHeight = 300;
    aspectName = 'Landscape (4:3)';
  } else if (aspect === '16:9') {
    viewportWidth = 440;
    viewportHeight = 248;
    aspectName = 'Landscape (16:9)';
  } else if (aspect === '16:10') {
    viewportWidth = 440;
    viewportHeight = 275;
    aspectName = 'Landscape (16:10)';
  }

  // Load image properties on src change
  useEffect(() => {
    if (!imageSrc) return;
    const img = new Image();
    img.onload = () => {
      setImageSize({ naturalWidth: img.naturalWidth, naturalHeight: img.naturalHeight });
      
      // Calculate initial size to "cover" the viewport
      const imgRatio = img.naturalWidth / img.naturalHeight;
      const vpRatio = viewportWidth / viewportHeight;
      
      let initWidth = 0;
      let initHeight = 0;
      
      if (imgRatio > vpRatio) {
        // Image is wider than viewport, fit height and scale width
        initHeight = viewportHeight;
        initWidth = viewportHeight * imgRatio;
      } else {
        // Image is taller than viewport, fit width and scale height
        initWidth = viewportWidth;
        initHeight = viewportWidth / imgRatio;
      }
      
      setInitialScaleSize({ width: initWidth, height: initHeight });
      // Reset zoom and pan
      setZoom(1.0);
      setPan({ x: 0, y: 0 });
    };
    img.src = imageSrc;
  }, [imageSrc, viewportWidth, viewportHeight]);

  // Handle Drag / Pan starting
  const handleDragStart = (clientX: number, clientY: number) => {
    setIsDragging(true);
    setDragStart({
      x: clientX - pan.x,
      y: clientY - pan.y
    });
  };

  const handleDragMove = (clientX: number, clientY: number) => {
    if (!isDragging) return;
    
    // Calculate new pan coords
    const newX = clientX - dragStart.x;
    const newY = clientY - dragStart.y;
    
    // Bounds check to avoid panning too far out of frame (optional, but keep it smooth)
    setPan({ x: newX, y: newY });
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  // Mouse Handlers
  const onMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    handleDragStart(e.clientX, e.clientY);
  };

  const onMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    handleDragMove(e.clientX, e.clientY);
  };

  // Touch Handlers
  const onTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    if (e.touches.length === 1) {
      handleDragStart(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  const onTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    if (e.touches.length === 1) {
      handleDragMove(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  // Execute Canvas Crop and output base64 dataUrl
  const handleApplyCrop = () => {
    if (imageSize.naturalWidth === 0 || initialScaleSize.width === 0) return;

    // Calculate scale factor to match original image pixels (100% original quality)
    let scaleFactor = imageSize.naturalWidth / initialScaleSize.width;
    
    // Cap output resolution to maximum of 2000px to keep quality ultra-sharp while optimizing loading speed
    const maxOutputDim = 2000;
    const currentMaxDim = Math.max(viewportWidth * scaleFactor, viewportHeight * scaleFactor);
    if (currentMaxDim > maxOutputDim) {
      scaleFactor = scaleFactor * (maxOutputDim / currentMaxDim);
    }

    const canvas = document.createElement('canvas');
    canvas.width = viewportWidth * scaleFactor;
    canvas.height = viewportHeight * scaleFactor;
    const ctx = canvas.getContext('2d');

    if (!ctx) return;

    // Premium high-quality downscaling
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    // Clear background (standard black)
    ctx.fillStyle = '#1c1917'; // stone-900
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const img = imageRef.current;
    if (img) {
      // Replicate the CSS transformations onto the canvas
      ctx.save();
      
      // Scale everything to match high-resolution canvas
      ctx.scale(scaleFactor, scaleFactor);
      
      // Translate to viewport center (transform origin)
      ctx.translate(viewportWidth / 2, viewportHeight / 2);
      
      // Apply offset panning
      ctx.translate(pan.x, pan.y);
      
      // Apply zoom scaling
      ctx.scale(zoom, zoom);
      
      // Draw image centered at the origin translation offset
      const dx = -initialScaleSize.width / 2;
      const dy = -initialScaleSize.height / 2;
      
      ctx.drawImage(img, dx, dy, initialScaleSize.width, initialScaleSize.height);
      ctx.restore();

      // Export as jpeg base64 with high quality
      const croppedBase64 = canvas.toDataURL('image/jpeg', 0.95);
      onCrop(croppedBase64);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/85 backdrop-blur-md transition-opacity duration-300">
      
      {/* Cropper Container Card */}
      <div className="relative w-full max-w-lg bg-stone-900 border border-stone-800 rounded-3xl shadow-2xl flex flex-col overflow-hidden text-stone-100 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-5 border-b border-stone-850 flex items-center justify-between">
          <div>
            <h3 className="font-serif text-lg font-bold tracking-wide text-white">Adjust Image Frame</h3>
            <p className="text-[10px] uppercase tracking-widest text-amber-500 font-semibold mt-1">Aspect: {aspectName}</p>
          </div>
          <button 
            onClick={onCancel}
            className="p-1.5 hover:bg-stone-800 text-stone-400 hover:text-white rounded-full transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Crop Viewport Area */}
        <div className="flex-grow flex items-center justify-center p-8 bg-stone-950/40 relative min-h-[350px]">
          
          {/* Overlay instruction */}
          <div className="absolute top-3 right-3 bg-stone-900/80 border border-stone-855 px-2.5 py-1.5 rounded-lg flex items-center space-x-1.5 text-[9px] uppercase tracking-wider text-stone-400 pointer-events-none">
            <Move className="w-3.5 h-3.5 text-amber-500" />
            <span>Drag Image to Position</span>
          </div>

          {/* Viewport Frame */}
          <div 
            ref={containerRef}
            style={{ width: `${viewportWidth}px`, height: `${viewportHeight}px` }}
            className="relative overflow-hidden border border-amber-500/20 shadow-2xl bg-stone-950 cursor-grab active:cursor-grabbing rounded-xl select-none"
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={handleDragEnd}
            onMouseLeave={handleDragEnd}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={handleDragEnd}
          >
            {/* The Image */}
            {imageSrc && (
              <img
                ref={imageRef}
                src={imageSrc}
                alt="Source preview"
                draggable={false}
                style={{
                  width: `${initialScaleSize.width}px`,
                  height: `${initialScaleSize.height}px`,
                  left: `${(viewportWidth - initialScaleSize.width) / 2}px`,
                  top: `${(viewportHeight - initialScaleSize.height) / 2}px`,
                  transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
                  transformOrigin: 'center center',
                  position: 'absolute'
                }}
                className="max-w-none select-none pointer-events-none"
              />
            )}

            {/* Grid overlay lines (subtle rule of thirds) */}
            <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 pointer-events-none opacity-20">
              <div className="border-r border-b border-white/40" />
              <div className="border-r border-b border-white/40" />
              <div className="border-b border-white/40" />
              <div className="border-r border-b border-white/40" />
              <div className="border-r border-b border-white/40" />
              <div className="border-b border-white/40" />
              <div className="border-r border-white/40" />
              <div className="border-r border-white/40" />
              <div />
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="p-6 bg-stone-900 border-t border-stone-850 space-y-6">
          
          {/* Zoom controls */}
          <div className="flex items-center space-x-4">
            <ZoomOut className="w-4 h-4 text-stone-550" />
            <input
              type="range"
              min="1.0"
              max="3.0"
              step="0.01"
              value={zoom}
              onChange={(e) => setZoom(parseFloat(e.target.value))}
              className="flex-grow h-1.5 bg-stone-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
            />
            <ZoomIn className="w-4 h-4 text-amber-500 animate-pulse" />
            <span className="text-[10px] tracking-wider text-stone-400 font-mono w-8 text-right">
              {Math.round(zoom * 100)}%
            </span>
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-end space-x-3">
            <button
              onClick={onCancel}
              className="px-5 py-2.5 bg-stone-800 hover:bg-stone-750 text-stone-300 hover:text-white rounded-lg text-xs font-semibold uppercase tracking-wider transition cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleApplyCrop}
              className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-stone-950 rounded-lg text-xs font-bold uppercase tracking-widest transition cursor-pointer flex items-center space-x-2"
            >
              <Check className="w-4 h-4 stroke-[3px]" />
              <span>Apply Crop</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
