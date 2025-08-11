'use client';
// version เป็นก้อนๆๆๆ
import { useState, useEffect, useRef } from 'react';

const TYPES = ['studio', 'one-bedroom', 'two-bedroom', 'penthouse'];

export default function SearchPage() {
  const [projectQuery, setProjectQuery] = useState('');
  const [locationQuery, setLocationQuery] = useState('');
  const [priceFrom, setPriceFrom] = useState('');
  const [priceTo, setPriceTo] = useState('');
  const [sizeFrom, setSizeFrom] = useState('');
  const [sizeTo, setSizeTo] = useState('');
  const [type, setType] = useState('');
  const [results, setResults] = useState([]);
  const [projectSuggestions, setProjectSuggestions] = useState([]);
  const [loadingResults, setLoadingResults] = useState(false);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const projectInputRef = useRef(null);

  // Load all properties on first load
  useEffect(() => {
    fetchProperties();
  }, []);

  // Fetch project suggestions when projectQuery changes
  useEffect(() => {
    if (!projectQuery) {
      setProjectSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    setLoadingSuggestions(true);

    const params = new URLSearchParams();
    params.append('suggest', 'projects');
    params.append('q', projectQuery);

    const debounce = setTimeout(() => {
      fetch(`/api/properties?${params.toString()}`)
        .then((res) => res.json())
        .then((data) => {
          setProjectSuggestions(data.projects || []);
          setShowSuggestions(true);
          setLoadingSuggestions(false);
        });
    }, 300);

    return () => clearTimeout(debounce);
  }, [projectQuery]);

  // Close suggestions on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (projectInputRef.current && !projectInputRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  function handleSuggestionClick(projectName) {
    setProjectQuery(projectName);
    setShowSuggestions(false);
  }

  function fetchProperties() {
    setLoadingResults(true);

    const params = new URLSearchParams();
    if (projectQuery) params.append('q', projectQuery);
    if (locationQuery) params.append('locationQuery', locationQuery);
    if (priceFrom) params.append('priceFrom', priceFrom);
    if (priceTo) params.append('priceTo', priceTo);
    if (sizeFrom) params.append('sizeFrom', sizeFrom);
    if (sizeTo) params.append('sizeTo', sizeTo);
    if (type) params.append('type', type);

    fetch(`/api/properties?${params.toString()}`)
      .then((res) => res.json())
      .then((data) => {
        setResults(data.results || []);
        setLoadingResults(false);
      })
      .catch(() => {
        setResults([]);
        setLoadingResults(false);
      });
  }

  return (
    <main style={{ maxWidth: 700, margin: '2rem auto', fontFamily: 'Arial, sans-serif' }}>
      <h1>Search Bangkok Condo Rooms</h1>

      <div style={{ marginBottom: 12 }}>
        <label style={{ marginRight: 12 }}>
          Price From:{' '}
          <input
            type="number"
            min={0}
            value={priceFrom}
            onChange={(e) => setPriceFrom(e.target.value)}
            placeholder="Min price"
            style={{ width: 120, padding: '0.25rem 0.5rem' }}
          />
        </label>

        <label>
          Price To:{' '}
          <input
            type="number"
            min={0}
            value={priceTo}
            onChange={(e) => setPriceTo(e.target.value)}
            placeholder="Max price"
            style={{ width: 120, padding: '0.25rem 0.5rem' }}
          />
        </label>
      </div>

      {/* Project Name search with autosuggest */}
      <div style={{ position: 'relative', marginBottom: 12 }} ref={projectInputRef}>
        <input
          type="search"
          placeholder="Search by project name..."
          value={projectQuery}
          onChange={(e) => setProjectQuery(e.target.value)}
          onFocus={() => {
            if (projectSuggestions.length > 0 && projectQuery) setShowSuggestions(true);
          }}
          style={{
            width: '100%',
            padding: '0.5rem 1rem',
            fontSize: '1rem',
            borderRadius: 4,
            border: '1px solid #ccc',
          }}
        />
        {showSuggestions && projectSuggestions.length > 0 && (
          <ul
            style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              background: 'white',
              border: '1px solid #ccc',
              borderTop: 'none',
              maxHeight: 200,
              overflowY: 'auto',
              zIndex: 10,
              listStyle: 'none',
              margin: 0,
              padding: 0,
              borderRadius: '0 0 4px 4px',
            }}
          >
            {projectSuggestions.slice(0, 5).map((projectName) => (
              <li
                key={projectName}
                onClick={() => handleSuggestionClick(projectName)}
                style={{
                  padding: '0.5rem 1rem',
                  cursor: 'pointer',
                  borderBottom: '1px solid #eee',
                }}
                onMouseDown={(e) => e.preventDefault()}
              >
                {projectName}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Location search input */}
      <div style={{ marginBottom: 24 }}>
        <input
          type="text"
          placeholder="Search by location..."
          value={locationQuery}
          onChange={(e) => setLocationQuery(e.target.value)}
          style={{
            width: '100%',
            padding: '0.5rem 1rem',
            fontSize: '1rem',
            borderRadius: 4,
            border: '1px solid #ccc',
          }}
        />
      </div>

      {/* Size filter inputs */}
      <div style={{ marginBottom: 12 }}>
        <label style={{ marginRight: 12 }}>
          Size From (m²):{' '}
          <input
            type="number"
            min={0}
            value={sizeFrom}
            onChange={(e) => setSizeFrom(e.target.value)}
            placeholder="Min size"
            style={{ width: 120, padding: '0.25rem 0.5rem' }}
          />
        </label>
        <label>
          Size To (m²):{' '}
          <input
            type="number"
            min={0}
            value={sizeTo}
            onChange={(e) => setSizeTo(e.target.value)}
            placeholder="Max size"
            style={{ width: 120, padding: '0.25rem 0.5rem' }}
          />
        </label>
      </div>

      {/* Type dropdown */}
      <div style={{ marginBottom: 24 }}>
        <label>
          Type:{' '}
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            style={{ padding: '0.5rem 1rem', fontSize: '1rem', borderRadius: 4, border: '1px solid #ccc' }}
          >
            <option value="">-- Select Type --</option>
            {TYPES.map((t) => (
              <option key={t} value={t}>
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </option>
            ))}
          </select>
        </label>
      </div>

      <button
        onClick={fetchProperties}
        style={{
          padding: '0.5rem 1.5rem',
          fontSize: '1rem',
          cursor: 'pointer',
          borderRadius: 4,
          border: 'none',
          backgroundColor: '#0070f3',
          color: 'white',
          marginBottom: 24,
        }}
      >
        Search
      </button>

      {loadingResults && <p>Loading...</p>}

      {!loadingResults && results.length === 0 && <p>No results found.</p>}

      {!loadingResults && results.length > 0 && (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {results.map((room) => (
            <li
              key={room.id}
              style={{
                border: '1px solid #ddd',
                borderRadius: 6,
                padding: '1rem',
                marginBottom: '1rem',
                boxShadow: '0 1px 3px rgb(0 0 0 / 0.1)',
              }}
            >
              <h2>
                {room.propertyName}{' '}
                <small style={{ fontWeight: 'normal', color: '#555' }}>
                  ({room.projectName})
                </small>
              </h2>
              <p><strong>Location:</strong> {room.location.join(', ')}</p>
              <p><strong>Status:</strong> {room.status}</p>
              <p>
                <strong>Bedrooms:</strong> {room.bedRoom} &nbsp;|&nbsp; 
                <strong>Bathrooms:</strong> {room.bathRoom} &nbsp;|&nbsp; 
                <strong>Type:</strong> {room.type} &nbsp;|&nbsp; 
                <strong>Size:</strong> {room.size} m²
              </p>
              <p>
                <strong>Rental Rate:</strong> ฿{room.rentalRate.toLocaleString()} / month &nbsp;|&nbsp; 
                <strong>Sell Price:</strong> ฿{room.sell.toLocaleString()}
              </p>
              <p>
                <strong>Tel:</strong> {room.tel} &nbsp;|&nbsp; 
                <strong>Line ID:</strong> {room.lineId}
              </p>
              <p>
                <strong>Facebook:</strong>{' '}
                <a
                  href={room.indexFbUrl}
                  target="_blank"
                  rel="noreferrer"
                  style={{ color: '#0070f3' }}
                >
                  {room.indexFbUrl}
                </a>
              </p>
              <p>
                <strong>Pet Friendly:</strong> {room.isPetFriendly ? 'Yes' : 'No'} &nbsp;|&nbsp; 
                <strong>Car Park:</strong> {room.carPark}
              </p>
              <p>
                <strong>Distance to Station:</strong> {room.distanceToStation} m &nbsp;|&nbsp; 
                <strong>Station:</strong> {room.distanceStation}
              </p>
              <p><strong>More Info:</strong> {room.more}</p>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
