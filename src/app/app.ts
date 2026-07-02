import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  // Estimate form fields (two-way bound)
  protected bookingForm = {
    name: '',
    phone: '',
    email: '',
    date: '',
    notes: ''
  };

  protected readonly bookingStatus = signal<'idle' | 'loading' | 'success' | 'error'>('idle');

  // Web3Forms Access Key (from https://web3forms.com)
  private readonly web3formsAccessKey: string = '68c614e2-97a3-4964-9b4b-b95cb9ec16e6';

  private resetForm(): void {
    this.bookingForm = { name: '', phone: '', email: '', date: '', notes: '' };
  }

  // Handle estimate form submission
  protected onSubmitBooking(event: Event): void {
    event.preventDefault();

    if (!this.bookingForm.name || !this.bookingForm.phone) {
      this.bookingStatus.set('error');
      return;
    }

    this.bookingStatus.set('loading');

    const payload = {
      access_key: this.web3formsAccessKey,
      subject: `New Estimate Request from ${this.bookingForm.name}`,
      from_name: 'Boran Plumbing Website',
      ...this.bookingForm
    };

    // Fallback: simulate success for local preview if the key is a placeholder
    if (this.web3formsAccessKey === 'YOUR_ACCESS_KEY_HERE') {
      setTimeout(() => {
        this.bookingStatus.set('success');
        this.resetForm();
      }, 1500);
      return;
    }

    fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(payload)
    })
      .then(async (response) => {
        if (response.ok) {
          this.bookingStatus.set('success');
          this.resetForm();
        } else {
          console.error('Submission error response:', await response.json());
          this.bookingStatus.set('error');
        }
      })
      .catch((error) => {
        console.error('Network error during submission:', error);
        this.bookingStatus.set('error');
      });
  }

  protected resetBookingStatus(): void {
    this.bookingStatus.set('idle');
  }
}
