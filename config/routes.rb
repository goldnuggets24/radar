Rails.application.routes.draw do
  resources :events do
    get 'add_user', :on => :member
  end

  authenticated :user do
  	root 'home#index', as: :authenticated_root
  end

  devise_scope :user do
  	root :to => 'devise/sessions#new'
  end
  
  devise_for :users, 
  :controllers => {:registrations => "users/registrations"}
  resources :users, :only => [:index]
end