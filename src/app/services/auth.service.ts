import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl; // Ensure this points to your actual API URL

  constructor(private http: HttpClient) { }

  getProfile(): Observable<any> {
    // Retrieve the access token from local storage
    const accessToken = localStorage.getItem('access_token');

    // Set up the headers with the access token
    const headers = new HttpHeaders({
      Authorization: `Bearer ${accessToken}`
    });

    // Use backticks for template literals to embed userId
    const userId = localStorage.getItem('user_id');
    return this.http.get<any>(`${this.apiUrl}/${userId}/profile`, { headers });
  }

  // Update user profile information
  updateProfile(userData: any): Observable<any> {
    const accessToken = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${accessToken}`
    });

    const userId = localStorage.getItem('user_id');
    return this.http.put<any>(`${this.apiUrl}/${userId}/profile`, userData, { headers });
  }

  // Update user password
  updatePassword(passwordData: any): Observable<any> {
    const accessToken = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${accessToken}`
    });

    const userId = localStorage.getItem('user_id');
    return this.http.put<any>(`${this.apiUrl}/${userId}/update-password`, passwordData, { headers });
  }

  // Get Children Lists
  getChildrenList(): Observable<any> {
    const accessToken = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${accessToken}`
    });

    const userId = localStorage.getItem('user_id');
    return this.http.get<any>(`${this.apiUrl}/${userId}/children`, { headers });
  }

  // Store a new child
  storeChild(childData: any): Observable<any> {
    const accessToken = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${accessToken}`
    });

    const userId = localStorage.getItem('user_id');
    return this.http.post<any>(`${this.apiUrl}/${userId}/children`, childData, { headers });
  }

  // Delete a child
  deleteChild(childId: string): Observable<any> {
    const accessToken = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${accessToken}`
    });

    const url = `${this.apiUrl}/children/${childId}`;
    return this.http.delete(url, { headers }); // Include the headers here
  }

  uploadProfilePicture(formData: FormData): Observable<any> {
    const accessToken = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${accessToken}`
    });

    const userId = localStorage.getItem('user_id');
    return this.http.post<any>(`${this.apiUrl}/${userId}/upload-profile-picture`, formData, { headers });
  }
}
