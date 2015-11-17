# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20151117140137) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "events", force: :cascade do |t|
    t.string   "title"
    t.date     "date"
    t.string   "description"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
    t.time     "start_time"
    t.time     "end_time"
    t.string   "location"
  end

  create_table "events_users", force: :cascade do |t|
    t.integer "event_id"
    t.integer "user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string   "email",                  default: "", null: false
    t.string   "encrypted_password",     default: "", null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet     "current_sign_in_ip"
    t.inet     "last_sign_in_ip"
    t.datetime "created_at",                          null: false
    t.datetime "updated_at",                          null: false
    t.string   "name"
    t.integer  "role"
    t.string   "sex"
    t.datetime "dob"
    t.string   "mobile"
    t.string   "ethnicity"
    t.string   "height"
    t.string   "weight"
    t.string   "t_shirt_size"
    t.string   "dress_size"
    t.string   "chest"
    t.string   "cup_size"
    t.string   "hip"
    t.string   "waist"
    t.string   "shoe_size"
    t.string   "eye_color"
    t.string   "hair_color"
    t.string   "hair_length"
    t.string   "tattoes"
    t.string   "address"
    t.string   "unit"
    t.string   "city"
    t.string   "state"
    t.string   "zip_code"
    t.string   "first_name"
    t.string   "last_name"
    t.string   "bio"
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree

end
