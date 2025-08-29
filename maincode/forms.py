# maincode/forms.py

from django import forms

class ContactForm(forms.Form):
    name = forms.CharField(
        max_length=100,
        widget=forms.TextInput(attrs={'placeholder': 'Your Name', 'class': 'form-input'}),
        label='Name'
    )
    email = forms.EmailField(
        widget=forms.EmailInput(attrs={'placeholder': 'Your Email', 'class': 'form-input'}),
        label='Email'
    )
    message = forms.CharField(
        widget=forms.Textarea(attrs={'placeholder': 'Type your message...', 'class': 'form-textarea', 'rows': 6}),
        label='Message'
    )
