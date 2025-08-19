import React, { useState, useEffect } from 'react';
import { Search, User, Phone } from 'lucide-react';
import { Input } from '@/Components/ui/input';
import { Button } from '@/Components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/Components/ui/avatar';
import { Patient } from '@/types';
import { searchPatients } from '@/Components/data/mockData';
import { cn } from '@/lib/utils';

interface PatientSearchProps {
  onPatientSelect?: (patient: Patient) => void;
  className?: string;
}

export const PatientSearch: React.FC<PatientSearchProps> = ({
  onPatientSelect,
  className
}) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Patient[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    if (query.length >= 2) {
      setIsSearching(true);
      // Simulate API delay
      const timer = setTimeout(() => {
        const searchResults = searchPatients(query);
        setResults(searchResults);
        setIsSearching(false);
        setShowResults(true);
      }, 300);

      return () => clearTimeout(timer);
    } else {
      setResults([]);
      setShowResults(false);
    }
  }, [query]);

  const handlePatientSelect = (patient: Patient) => {
    setQuery(patient.name);
    setShowResults(false);
    if (onPatientSelect) {
      onPatientSelect(patient);
    }
  };

  const handleInputBlur = () => {
    // Delay hiding results to allow clicking on them
    setTimeout(() => setShowResults(false), 200);
  };

  return (
    <div className={cn("relative", className)}>
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Cari pasien (nama atau NIK)..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onBlur={handleInputBlur}
          onFocus={() => query.length >= 2 && setShowResults(true)}
          className="pl-12 pr-4 py-6 text-lg bg-card border-2 border-accent/20 focus:border-primary rounded-xl shadow-[var(--shadow-card)]"
        />
        {isSearching && (
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
            <div className="animate-spin h-5 w-5 border-2 border-primary border-t-transparent rounded-full"></div>
          </div>
        )}
      </div>

      {/* Search Results Dropdown */}
      {showResults && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-xl shadow-[var(--shadow-card-hover)] z-50 max-h-80 overflow-y-auto">
          <div className="p-2">
            {results.map((patient) => (
              <button
                key={patient.id}
                onClick={() => handlePatientSelect(patient)}
                className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-[var(--transition-smooth)] text-left"
              >
                <Avatar className="w-10 h-10">
                  <AvatarImage src={patient.profile_photo} alt={patient.name} />
                  <AvatarFallback className="bg-accent text-accent-foreground">
                    {patient.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-foreground truncate">{patient.name}</p>
                  <p className="text-sm text-muted-foreground">
                    NIK: {patient.nik}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {patient.age} tahun • {patient.gender === 'male' ? 'Laki-laki' : 'Perempuan'}
                  </p>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Phone className="w-4 h-4" />
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* No Results */}
      {showResults && results.length === 0 && query.length >= 2 && !isSearching && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-xl shadow-[var(--shadow-card)] z-50">
          <div className="p-4 text-center text-muted-foreground">
            <User className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p>Tidak ada pasien ditemukan</p>
            <p className="text-xs mt-1">Coba dengan nama atau NIK yang berbeda</p>
          </div>
        </div>
      )}
    </div>
  );
};
