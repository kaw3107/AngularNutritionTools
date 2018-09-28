import { Component, OnInit, AfterViewInit, ElementRef, ViewEncapsulation } from '@angular/core';
import { FeedService } from 'src/app/blog/feed.service';
import { FeedEntry } from 'src/app/models/feed-entry.model';
import {Observable } from 'rxjs';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
})

export class BlogComponent implements OnInit{
  private feedUrl: string = 'http://blog.myfitnesspal.com/feed/';
  feeds: Array<FeedEntry> = [];

  constructor (
    private feedService: FeedService
  ) {}

  ngOnInit() {
    this.refreshFeed();
  }

  refreshFeed() {
    this.feeds.length = 0;
    // Adds 1s of delay to provide user's feedback.
    this.feedService.getFeedContent(this.feedUrl).delay(1000)
        .subscribe(
            feed => this.feeds = feed.items,
            error => console.log(error));
  }

}
