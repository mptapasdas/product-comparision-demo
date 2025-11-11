import React, { useRef, useEffect } from 'react';
import './attribute-table.css';

const AttributeTable = ({ products, attributes }) => {
  const headerRef = useRef(null);
  const bodyRef = useRef(null);

  const valueRowsRef = useRef([]);

  const handleHeaderScroll = (e) => {
    const scrollLeft = e.target.scrollLeft;

    window.requestAnimationFrame(() => {
      valueRowsRef.current.forEach(rowNode => {
        if (rowNode) {
          rowNode.style.transform = `translateX(-${scrollLeft}px)`;
        }
      });
    });
  };

  useEffect(() => {
    const bodyEl = bodyRef.current;
    if (!bodyEl) return;

    const handleBodyWheel = (e) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        e.preventDefault();
        if (headerRef.current) {
          headerRef.current.scrollLeft += e.deltaX;
        }
      }
    };

    bodyEl.addEventListener('wheel', handleBodyWheel, { passive: false });
    return () => {
      bodyEl.removeEventListener('wheel', handleBodyWheel);
    };
  }, []);

  useEffect(() => {
    valueRowsRef.current = valueRowsRef.current.slice(0, attributes.length);
  }, [attributes]);

  const scrollableWidth = products.length * 150;

  return (
    <div className="comparison-container">
      <div
        className="product-header-container"
        onScroll={handleHeaderScroll}
        ref={headerRef}
      >
        <div className="product-names" style={{ width: `${scrollableWidth}px` }}>
          {products.map((product, i) => (
            <div key={i} className="product-cell">{product}</div>
          ))}
        </div>
      </div>

      <div className="attributes-container" ref={bodyRef}>
        {attributes.map((attribute, i) => (
          <div key={i} className="attribute-group">
            <div className="attribute-title">{attribute.title}</div>
            <div className="values-row-wrapper">
              <div
                className="values-row-content"
                ref={el => (valueRowsRef.current[i] = el)}
                style={{ width: `${scrollableWidth}px` }}
              >
                {attribute.values.map((value, j) => (
                  <div key={j} className="value-cell">{value}</div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AttributeTable;
