'use client';

import { useState, useEffect, useRef } from 'react';

const TYPES = ['studio', 'one-bedroom', 'two-bedroom', 'penthouse'];

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [priceFrom, setPriceFrom] = useState('');
  const [priceTo, setPriceTo] = useState('');
  const [sizeFrom, setSizeFrom] = useState('');
  const [sizeTo, setSizeTo] = useState('');
  const [type, setType] = useState('');
  const [results, setResults] = useState([]);
  const [projectSuggestions, setProjectSuggestions] = useState<string[]>([]);
  const [loadingResults, setLoadingResults] = useState(false);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchProperties();
  }, []);

  // Autosuggest only on project names (searchQuery used as q param)
  useEffect(() => {
    if (!searchQuery.trim()) {
      setProjectSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    setLoadingSuggestions(true);

    const params = new URLSearchParams();
    params.append('suggest', 'projects');
    params.append('q', searchQuery.trim());

    const fetchSuggestions = async () => {
      try {
        const res = await fetch(`/api/properties?${params.toString()}`);
        if (!res.ok) throw new Error('Failed to fetch suggestions');
        const data = await res.json();
        setProjectSuggestions(Array.isArray(data.projects) ? data.projects : []);
        setShowSuggestions(true);
      } catch (error) {
        console.error('Suggestion fetch error:', error);
        setProjectSuggestions([]);
        setShowSuggestions(false);
      } finally {
        setLoadingSuggestions(false);
      }
    };

    const debounce = setTimeout(() => {
      fetchSuggestions();
    }, 300);

    return () => clearTimeout(debounce);
  }, [searchQuery]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  function handleSuggestionClick(projectName: string) {
    setSearchQuery(projectName);
    setShowSuggestions(false);
  }

  function fetchProperties() {
    setLoadingResults(true);

    const params = new URLSearchParams();
    if (searchQuery.trim()) params.append('q', searchQuery.trim());
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
    <main style={{ maxWidth: 900, margin: '2rem auto', fontFamily: 'Arial, sans-serif' }}>
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

      {/* Single combined search input */}
      <div style={{ position: 'relative', marginBottom: 24 }} ref={inputRef}>
        <input
          type="search"
          placeholder="Search by project name or location..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => {
            if (projectSuggestions.length > 0 && searchQuery.trim()) setShowSuggestions(true);
          }}
          style={{
            width: '100%',
            padding: '0.5rem 1rem',
            fontSize: '1rem',
            borderRadius: 4,
            border: '1px solid #ccc',
          }}
          autoComplete="off"
        />
        {loadingSuggestions && (
          <div
            style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              background: 'white',
              border: '1px solid #ccc',
              borderTop: 'none',
              padding: '0.5rem',
              zIndex: 10,
            }}
          >
            Loading...
          </div>
        )}
        {showSuggestions && projectSuggestions.length > 0 && !loadingSuggestions && (
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
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            boxShadow: '0 1px 3px rgb(0 0 0 / 0.1)',
          }}
        >
          <thead>
            <tr style={{ backgroundColor: '#f0f0f0' }}>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Property Name</th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Project</th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Location</th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Status</th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Bedrooms</th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Bathrooms</th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Type</th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Size (m²)</th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Rental Rate (฿/month)</th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Sell Price (฿)</th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Contact Tel</th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Line ID</th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Facebook</th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Pet Friendly</th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Car Park</th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Distance to Station (m)</th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Station</th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>More Info</th>
            </tr>
          </thead>
          <tbody>
            {results.map((room: any) => (
              <tr key={room.id}>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{room.propertyName}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{room.projectName}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{room.location.join(', ')}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{room.status}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{room.bedRoom}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{room.bathRoom}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{room.type}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{room.size}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{room.rentalRate.toLocaleString()}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{room.sell.toLocaleString()}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{room.tel}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{room.lineId}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                  <a href={room.indexFbUrl} target="_blank" rel="noreferrer" style={{ color: '#0070f3' }}>
                    Link
                  </a>
                </td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{room.isPetFriendly ? 'Yes' : 'No'}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{room.carPark}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{room.distanceToStation}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{room.distanceStation}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{room.more}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </main>
  );
}
