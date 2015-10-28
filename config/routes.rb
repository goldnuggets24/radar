Rails.application.routes.draw do
  authenticated :user do
  	root 'home#index', as: :authenticated_root
  end

  devise_scope :user do
  	root :to => 'devise/sessions#new'
  end
  
  devise_for :users
  resources :users, :only => [:index]
end