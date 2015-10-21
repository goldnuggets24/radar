Rails.application.routes.draw do
<<<<<<< HEAD
  root 'home#index'
  devise_for :users
  resources :users, :only => [:index]
end
=======
  root to: 'visitors#index'
  devise_for :users
  resources :users
end
>>>>>>> 568d6b36db273d9ad8f140683047fc600dd299f1
