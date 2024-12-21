import { describe, it, expect, vi } from 'vitest';
import { validateTimerForm, TimerFormData } from './validation';
import { toast } from 'sonner';

vi.mock('sonner', () => ({
  toast: {
    error: vi.fn(),
  },
}));

describe('validateTimerForm', () => {
  it('should return false and show error if title is empty', () => {
    const data: TimerFormData = { title: '', description: '', hours: 0, minutes: 0, seconds: 0 };
    const result = validateTimerForm(data);
    expect(result).toBe(false);
    expect(toast.error).toHaveBeenCalledWith('Title is required');
  });

  it('should return false and show error if title is more than 50 characters', () => {
    const data: TimerFormData = { title: 'a'.repeat(51), description: '', hours: 0, minutes: 0, seconds: 0 };
    const result = validateTimerForm(data);
    expect(result).toBe(false);
    expect(toast.error).toHaveBeenCalledWith('Title must be less than 50 characters');
  });

  it('should return false and show error if any time value is negative', () => {
    const data: TimerFormData = { title: 'Test', description: '', hours: -1, minutes: 0, seconds: 0 };
    const result = validateTimerForm(data);
    expect(result).toBe(false);
    expect(toast.error).toHaveBeenCalledWith('Time values cannot be negative');
  });

  it('should return false and show error if minutes or seconds are greater than 59', () => {
    const data: TimerFormData = { title: 'Test', description: '', hours: 0, minutes: 60, seconds: 0 };
    const result = validateTimerForm(data);
    expect(result).toBe(false);
    expect(toast.error).toHaveBeenCalledWith('Minutes and seconds must be between 0 and 59');
  });

  it('should return false and show error if total time is 0', () => {
    const data: TimerFormData = { title: 'Test', description: '', hours: 0, minutes: 0, seconds: 0 };
    const result = validateTimerForm(data);
    expect(result).toBe(false);
    expect(toast.error).toHaveBeenCalledWith('Please set a time greater than 0');
  });

  it('should return false and show error if total time exceeds 24 hours', () => {
    const data: TimerFormData = { title: 'Test', description: '', hours: 25, minutes: 0, seconds: 0 };
    const result = validateTimerForm(data);
    expect(result).toBe(false);
    expect(toast.error).toHaveBeenCalledWith('Timer cannot exceed 24 hours');
  });

  it('should return true for valid data', () => {
    const data: TimerFormData = { title: 'Valid Timer', description: '', hours: 1, minutes: 30, seconds: 30 };
    const result = validateTimerForm(data);
    expect(result).toBe(true);
  });
});