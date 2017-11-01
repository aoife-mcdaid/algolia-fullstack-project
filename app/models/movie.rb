class Movie < ActiveRecord::Base
  validates_presence_of :title
  validates :year, numericality: {
                                    less_than_or_equal_to: 2018,
                                    greater_than_or_equal_to: 1900,
                                    only_integer: true
                                  }

  include AlgoliaSearch

  serialize :alternative_titles, Array
  serialize :actors, Array
  serialize :actor_facets, Array
  serialize :genre, Array

  algoliasearch do
    attribute :title, :alternative_titles, :actors, :year, :genre, :rating
    searchableAttributes ['title']
  end
end
