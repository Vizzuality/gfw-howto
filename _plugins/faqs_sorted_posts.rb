module Jekyll
  class FaqsSortedPosts < Jekyll::Generator
    safe true
    priority :lowest

    def generate(site)
      sorted_posts = []
      tags_info = Jekyll.configuration({})['tags_info']

      # First include only posts of 'faq' category
      site.posts.docs.each do |post|
        sorted_posts << post if post['categories'].include? 'faqs'
      end
     
      # Then sort them according to title
      sorted_posts = sorted_posts.sort{ |a,b| a.data["title"] <=> b.data["title"] } 

      # Then sort them by tag
      grouped_posts = sorted_posts.group_by { |post| 
        post.data["tags"][0].to_s
      }.sort { |a,b| 
        tagA = tags_info[a[0]]
        tagB = tags_info[b[0]]
        tagA["order"] <=> tagB["order"]         
      } 

      site.config["faqs_sorted_posts"] = grouped_posts.flatten
    end
  end
end