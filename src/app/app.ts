import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface ServiceItem {
  id: string;
  title: string;
  description: string;
  priceEstimate: string;
  highlighted: boolean;
  imageClass: string;
}


@Component({
  selector: 'app-root',
  imports: [CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  // Mobile Nav State
  protected readonly isMobileMenuOpen = signal(false);

  // Emergency Banner State
  protected readonly isEmergencyBannerVisible = signal(true);

  // Booking Form Fields (standard properties for two-way model binding)
  protected bookingForm = {
    name: '',
    phone: '',
    email: '',
    serviceType: '',
    date: '',
    timeSlot: '',
    notes: ''
  };

  // Booking Form Status
  protected readonly bookingStatus = signal<'idle' | 'loading' | 'success' | 'error'>('idle');

  // Zip Code Checker Fields
  protected zipCodeInput = '';
  protected readonly zipCheckResult = signal<{
    checked: boolean;
    isSupported: boolean;
    message: string;
  }>({ checked: false, isSupported: false, message: '' });

  // Mock list of covered zip codes (Middlesex, Worcester, and Norfolk Counties)
  private readonly supportedZipCodes = new Set([
    '01747', // Hopedale
    '01757', // Milford
    '01756', // Mendon
    '01568', // Upton
    '02038', // Franklin
    '02019', // Bellingham
    '02053', // Medway
    '02054', // Millis
    '01519', // Grafton
    '01545', // Shrewsbury
    '01601', '01602', '01603', '01604', '01605', '01606', // Worcester
    '01701', '01702', // Framingham
    '01760', // Natick
    '01752'  // Marlborough
  ]);

  // Core Services
  protected readonly services: ServiceItem[] = [
    {
      id: 'emergency',
      title: 'Plumbing Repairs & Installations',
      description: 'Handling all standard repairs, pipe leaks, bathroom & kitchen plumbing, faucets, sinks, toilets, and comprehensive residential renovations from start to finish.',
      priceEstimate: 'Free Estimates · Quality Work',
      highlighted: true,
      imageClass: 'bg-gradient-to-br from-neutral-900 to-neutral-950'
    },
    {
      id: 'boiler',
      title: 'Steam Boiler Specialists',
      description: 'Expert steam boiler installation, scheduled repair, system troubleshooting, and annual preventive maintenance by certified heating engineers.',
      priceEstimate: 'Specialist Dispatch · Over 20 Yrs Exp',
      highlighted: false,
      imageClass: 'bg-gradient-to-br from-neutral-900 to-neutral-950'
    },
    {
      id: 'heating',
      title: 'Heating System Repairs & Service',
      description: 'Comprehensive furnace and heating system maintenance, component replacements, air balancing, and thermal tuning for winter safety.',
      priceEstimate: 'Reliable Service You Can Trust',
      highlighted: false,
      imageClass: 'bg-gradient-to-br from-neutral-900 to-neutral-950'
    },
    {
      id: 'gas',
      title: 'Gas Piping & Gas Appliance Installations',
      description: 'Precision gas line mapping, technical pipe runs, leak checks, and gas appliance installations (ovens, dryers, ranges, boilers) to rigid safety codes.',
      priceEstimate: 'Licensed & Insured Professionals',
      highlighted: false,
      imageClass: 'bg-gradient-to-br from-neutral-900 to-neutral-950'
    }
  ];


  // Toggle mobile navigation menu
  protected toggleMobileMenu(): void {
    this.isMobileMenuOpen.update(v => !v);
  }

  // Close mobile navigation menu
  protected closeMobileMenu(): void {
    this.isMobileMenuOpen.set(false);
  }

  // Hide the emergency alert banner
  protected dismissEmergencyBanner(): void {
    this.isEmergencyBannerVisible.set(false);
  }

  // Handle service area zip code validation
  protected checkZipCode(): void {
    const rawZip = this.zipCodeInput.trim();
    if (!rawZip) {
      this.zipCheckResult.set({
        checked: true,
        isSupported: false,
        message: 'Please enter a valid zip code.'
      });
      return;
    }

    const isSupported = this.supportedZipCodes.has(rawZip);
    if (isSupported) {
      this.zipCheckResult.set({
        checked: true,
        isSupported: true,
        message: 'Great news! We serve your area. Click below to book your appointment.'
      });
    } else {
      this.zipCheckResult.set({
        checked: true,
        isSupported: false,
        message: 'We currently do not cover this zip code, but call us at (781) 269-0150 for special requests.'
      });
    }
  }

  // Select service category from services section to pre-fill form
  protected selectServiceForBooking(serviceId: string): void {
    this.bookingForm.serviceType = serviceId;
    // Smooth scroll to booking section
    const bookingSection = document.getElementById('booking');
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: 'smooth' });
    }
  }

  // Web3Forms Access Key: Replace with your actual key from https://web3forms.com
  private readonly web3formsAccessKey = 'YOUR_ACCESS_KEY_HERE';

  // Handle booking form submission
  protected onSubmitBooking(event: Event): void {
    event.preventDefault();
    
    // Check form validation basic rules
    if (!this.bookingForm.name || !this.bookingForm.phone || !this.bookingForm.serviceType) {
      this.bookingStatus.set('error');
      return;
    }

    this.bookingStatus.set('loading');

    // Prepare Web3Forms payload
    const payload = {
      access_key: this.web3formsAccessKey,
      subject: `New Estimate Request from ${this.bookingForm.name}`,
      from_name: 'Boran Plumbing Website',
      ...this.bookingForm
    };

    // Fallback: If access key is placeholder, simulate success for local preview and testing
    if (this.web3formsAccessKey === 'YOUR_ACCESS_KEY_HERE') {
      setTimeout(() => {
        this.bookingStatus.set('success');
        this.bookingForm = {
          name: '',
          phone: '',
          email: '',
          serviceType: '',
          date: '',
          timeSlot: '',
          notes: ''
        };
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
        // Reset form fields
        this.bookingForm = {
          name: '',
          phone: '',
          email: '',
          serviceType: '',
          date: '',
          timeSlot: '',
          notes: ''
        };
      } else {
        const errorData = await response.json();
        console.error('Submission error response:', errorData);
        this.bookingStatus.set('error');
      }
    })
    .catch((error) => {
      console.error('Network error during submission:', error);
      this.bookingStatus.set('error');
    });
  }

  // Reset form status to try booking again
  protected resetBookingStatus(): void {
    this.bookingStatus.set('idle');
  }
}
