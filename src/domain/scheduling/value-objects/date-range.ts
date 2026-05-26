export class DateRange {
  constructor(public readonly start: Date, public readonly end: Date) {
    if (start >= end) {
      throw new Error('Start date must be before end date');
    }
  }

  overlaps(other: DateRange): boolean {
    return this.start < other.end && other.start < this.end;
  }

  get durationInMinutes(): number {
    return (this.end.getTime() - this.start.getTime()) / (1000 * 60);
  }
}
