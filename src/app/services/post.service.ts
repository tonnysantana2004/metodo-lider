import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private readonly postsUrl = 'assets/database/posts.json';

  constructor(private http: HttpClient) { }

  // Pega todos os posts dentro de database/posts.json e retorna como um array de objetos
  findAll() {
    return this.http.get<any[]>(this.postsUrl);
  }

}