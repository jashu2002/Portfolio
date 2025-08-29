# maincode/views.py

from django.shortcuts import render, redirect
from django.conf import settings
from django.core.mail import send_mail, BadHeaderError
from django.contrib import messages
from .forms import ContactForm
import datetime

def home(request):
    return render(request, 'home.html')

def about(request):
    return render(request, 'about.html')

def projects(request):
    return render(request, 'projects.html')

def contact(request):
    if request.method == "POST":
        form = ContactForm(request.POST)
        if form.is_valid():
            name = form.cleaned_data['name']
            email = form.cleaned_data['email']
            message = form.cleaned_data['message']
            subject = f"Portfolio Inquiry from {name}"
            full_message = f"Sender Name: {name}\nSender Email: {email}\n\nMessage:\n{message}"
            try:
                send_mail(
                    subject,
                    full_message,
                    settings.DEFAULT_FROM_EMAIL,  # ✅ your Gmail as sender
                    ['jashu0306@gamil.com'],  # replace with your receiving email address
                )
                messages.success(request, "Message sent successfully! Thank you for contacting me.")
                return redirect('contact')
            except BadHeaderError:
                messages.error(request, "Invalid header found.")
        else:
            messages.error(request, "Please correct the errors below.")
    else:
        form = ContactForm()
    return render(request, 'contact.html', {
        'form': form,
        'current_year': datetime.datetime.now().year
    })
