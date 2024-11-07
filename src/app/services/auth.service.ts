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

  getFilteredChildActivities(childId: string, searchTerm?: string, category?: string): Observable<any> {
    const accessToken = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${accessToken}`
    });

    // Construct the URL with query parameters
    let url = `${this.apiUrl}/children/${childId}/activities`;
    const params = new URLSearchParams();

    // Check for searchTerm
    if (searchTerm) {
      params.append('searchTerm', searchTerm);
    }

    // Check for category; only add if it's not "All" or not empty
    if (category && category !== "All") {
      params.append('category', category);
    }

    // Append query parameters to the URL if they exist
    if (params.toString()) {
      url += `?${params.toString()}`;
    }

    return this.http.get<any>(url, { headers });
  }


  // Store a new child activity
  storeChildActivity(childId: string, activityData: any): Observable<any> {
    const accessToken = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${accessToken}`
    });

    return this.http.post<any>(`${this.apiUrl}/children/${childId}/activities`, activityData, { headers });
  }

  // Delete an existing child activity
  deleteActivity(childId: string, activityId: string): Observable<any> {
    const accessToken = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${accessToken}`
    });

    return this.http.delete<any>(`${this.apiUrl}/children/${childId}/activities/${activityId}`, { headers });
  }

  getVideoReferences(): Observable<any> {
    const accessToken = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${accessToken}`
    });

    return this.http.get<any>(`${this.apiUrl}/get-video-references`, { headers });
  }

  getMilestonesByAge(): Observable<any> {
    const accessToken = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${accessToken}`
    });

    return this.http.get<any>(`${this.apiUrl}/get-milestones-by-age`, { headers });
  }
}
