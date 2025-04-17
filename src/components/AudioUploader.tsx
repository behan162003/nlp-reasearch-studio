
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { FileAudio, Upload, Loader2, Mic } from 'lucide-react';
import { processAudio } from '@/utils/audioUtils';

interface AudioUploaderProps {
  onAudioProcessed: (text: string) => void;
}

export const AudioUploader = ({ onAudioProcessed }: AudioUploaderProps) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check if the file is an audio file
      if (!file.type.startsWith('audio/')) {
        setError('Please upload an audio file (mp3, wav, etc.)');
        setSelectedFile(null);
        return;
      }
      
      setSelectedFile(file);
      setError(null);
    }
  };

  const handleProcess = async () => {
    if (!selectedFile) {
      setError('Please select an audio file first');
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      const text = await processAudio(selectedFile);
      onAudioProcessed(text);
    } catch (err) {
      setError('Failed to process audio file. Please try again.');
      console.error('Audio processing error:', err);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Card className="p-3 animate-fade-in">
      <div className="flex flex-col items-center justify-center border-2 border-dashed border-indigo-200 rounded-lg p-4 bg-gradient-to-r from-indigo-50 to-purple-50">
        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-indigo-400 to-purple-500 flex items-center justify-center mb-3 shadow-md">
          <Mic className="h-6 w-6 text-white" />
        </div>
        <p className="text-base font-medium mb-3 text-indigo-700">Upload audio for analysis</p>
        
        <label className="relative cursor-pointer bg-white rounded-full font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none">
          <span className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white px-3 py-1.5 rounded-full shadow-md hover:shadow-lg transition-all duration-200 text-xs">
            Select audio file
          </span>
          <input 
            type="file" 
            className="sr-only" 
            accept="audio/*" 
            onChange={handleFileChange}
            disabled={isProcessing}
          />
        </label>
        
        {selectedFile && (
          <div className="mt-2 text-xs text-indigo-700">
            Selected: {selectedFile.name}
          </div>
        )}
        
        {error && (
          <div className="mt-2 text-xs text-red-600">
            {error}
          </div>
        )}
      </div>

      <Button 
        onClick={handleProcess}
        disabled={!selectedFile || isProcessing}
        className="w-full mt-3 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 transition-all duration-200 text-sm"
        size="sm"
      >
        {isProcessing ? (
          <>
            <Loader2 className="mr-1 h-3 w-3 animate-spin" />
            Processing...
          </>
        ) : (
          <>
            <Upload className="mr-1 h-3 w-3" />
            Process Audio
          </>
        )}
      </Button>
    </Card>
  );
};
