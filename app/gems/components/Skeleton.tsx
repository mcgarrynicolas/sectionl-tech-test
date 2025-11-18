export function LoadingSkeleton() {
    return (     
      <div className="sidebar-layout-container">
        <div className="sidebar">
          <ul className="menu bg-base-200 min-h-full p-4">
                <li className="p-1 justify-center bg-amber-400 text-gray-600 font-bold text-m rounded-xl hover:bg-gray-600 hover:text-amber-400"><a href="/">Home</a></li>
          </ul>
        </div>
        <div className="main-content">
          <ul className="menu bg-base-200 min-h-full p-4">
          </ul>
        </div>
        <div className="qr-code-bar">
          <ul className="menu bg-base-200 min-h-full p-4">
          </ul>
        </div>
      </div>
    );
  }