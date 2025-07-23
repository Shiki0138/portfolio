// デバウンス関数
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// スロットル関数
export const throttle = (func, limit) => {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

// レスポンシブ画像サイズ計算
export const getOptimalImageSize = (containerWidth, devicePixelRatio = 1) => {
  const baseWidth = containerWidth * devicePixelRatio;
  
  // 一般的な画像サイズに丸める
  const sizes = [320, 640, 768, 1024, 1280, 1600, 1920];
  return sizes.find(size => size >= baseWidth) || sizes[sizes.length - 1];
};

// パフォーマンス監視
export const performanceMonitor = {
  // アニメーション性能測定
  measureAnimation: (name, animationFunction) => {
    const start = performance.now();
    
    return new Promise((resolve) => {
      const executeAnimation = () => {
        animationFunction();
        const end = performance.now();
        const duration = end - start;
        
        console.log(`Animation "${name}" took ${duration.toFixed(2)}ms`);
        
        if (duration > 16.67) { // 60fps threshold
          console.warn(`Animation "${name}" may cause frame drops (${duration.toFixed(2)}ms)`);
        }
        
        resolve(duration);
      };
      
      requestAnimationFrame(executeAnimation);
    });
  },

  // メモリ使用量監視
  checkMemoryUsage: () => {
    if ('memory' in performance) {
      const memory = performance.memory;
      return {
        used: Math.round(memory.usedJSHeapSize / 1048576), // MB
        total: Math.round(memory.totalJSHeapSize / 1048576), // MB
        limit: Math.round(memory.jsHeapSizeLimit / 1048576) // MB
      };
    }
    return null;
  },

  // FPS測定
  measureFPS: (duration = 1000) => {
    return new Promise((resolve) => {
      let frames = 0;
      let startTime = performance.now();
      
      const countFrame = () => {
        frames++;
        const currentTime = performance.now();
        
        if (currentTime - startTime >= duration) {
          const fps = Math.round((frames * 1000) / (currentTime - startTime));
          resolve(fps);
        } else {
          requestAnimationFrame(countFrame);
        }
      };
      
      requestAnimationFrame(countFrame);
    });
  }
};

// GPU加速用のCSS変換
export const enableGPUAcceleration = (element) => {
  if (element) {
    element.style.transform = 'translateZ(0)';
    element.style.willChange = 'transform, opacity';
  }
};

// GPU加速を無効化
export const disableGPUAcceleration = (element) => {
  if (element) {
    element.style.transform = '';
    element.style.willChange = 'auto';
  }
};

// 画像の事前読み込み
export const preloadImages = (imageUrls) => {
  return Promise.all(
    imageUrls.map(url => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(url);
        img.onerror = () => reject(new Error(`Failed to load image: ${url}`));
        img.src = url;
      });
    })
  );
};

// Critical Resource Hints
export const addResourceHint = (href, rel = 'prefetch', as = null) => {
  const link = document.createElement('link');
  link.rel = rel;
  link.href = href;
  if (as) link.as = as;
  document.head.appendChild(link);
};

// バンドルサイズ分析用のダイナミックインポート
export const dynamicImport = async (importFunction, fallback = null) => {
  try {
    const module = await importFunction();
    return module.default || module;
  } catch (error) {
    console.error('Dynamic import failed:', error);
    return fallback;
  }
};